import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'probox_infotech';

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }
  
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client;
}

async function getDb() {
  const client = await getMongoClient();
  return client.db(DB_NAME);
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS (preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET handler
export async function GET(request, { params }) {
  const path = params?.path || [];
  const pathString = '/' + path.join('/');

  try {
    // Root endpoint
    if (pathString === '/' || pathString === '') {
      return NextResponse.json(
        { message: 'Probox Infotech API is running', version: '1.0.0' },
        { headers: corsHeaders }
      );
    }

    // Health check
    if (pathString === '/health') {
      return NextResponse.json(
        { status: 'healthy', timestamp: new Date().toISOString() },
        { headers: corsHeaders }
      );
    }

    // Get all contacts (admin endpoint)
    if (pathString === '/contacts') {
      const db = await getDb();
      const contacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json(
        { success: true, data: contacts },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST handler
export async function POST(request, { params }) {
  const path = params?.path || [];
  const pathString = '/' + path.join('/');

  try {
    // Contact form submission
    if (pathString === '/contact') {
      const body = await request.json();
      const { name, email, phone, service, message } = body;

      // Validation
      if (!name || !email || !service || !message) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400, headers: corsHeaders }
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400, headers: corsHeaders }
        );
      }

      // Save to database
      const db = await getDb();
      const contact = {
        id: uuidv4(),
        name,
        email,
        phone: phone || '',
        service,
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await db.collection('contacts').insertOne(contact);

      return NextResponse.json(
        { success: true, message: 'Contact form submitted successfully', id: contact.id },
        { status: 201, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT handler
export async function PUT(request, { params }) {
  const path = params?.path || [];
  const pathString = '/' + path.join('/');

  try {
    // Update contact status
    if (pathString.startsWith('/contacts/')) {
      const contactId = path[1];
      const body = await request.json();
      const { status } = body;

      if (!contactId) {
        return NextResponse.json(
          { error: 'Contact ID required' },
          { status: 400, headers: corsHeaders }
        );
      }

      const db = await getDb();
      const result = await db.collection('contacts').updateOne(
        { id: contactId },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Contact updated successfully' },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  const path = params?.path || [];
  const pathString = '/' + path.join('/');

  try {
    // Delete contact
    if (pathString.startsWith('/contacts/')) {
      const contactId = path[1];

      if (!contactId) {
        return NextResponse.json(
          { error: 'Contact ID required' },
          { status: 400, headers: corsHeaders }
        );
      }

      const db = await getDb();
      const result = await db.collection('contacts').deleteOne({ id: contactId });

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Contact deleted successfully' },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
