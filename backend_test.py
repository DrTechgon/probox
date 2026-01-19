#!/usr/bin/env python3
"""
Backend API Testing for Probox Infotech Website
Tests all API endpoints with comprehensive scenarios
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://probox-revamp.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def print_test_result(test_name, success, details=""):
    """Print formatted test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} {test_name}")
    if details:
        print(f"   Details: {details}")
    print()

def test_api_root():
    """Test GET /api/ - API info endpoint"""
    print("🔍 Testing API Root Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "version" in data:
                print_test_result("API Root Endpoint", True, f"Message: {data['message']}, Version: {data['version']}")
                return True
            else:
                print_test_result("API Root Endpoint", False, "Missing required fields in response")
                return False
        else:
            print_test_result("API Root Endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
            return False
            
    except Exception as e:
        print_test_result("API Root Endpoint", False, f"Exception: {str(e)}")
        return False

def test_health_endpoint():
    """Test GET /api/health - Health check endpoint"""
    print("🔍 Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "status" in data and data["status"] == "healthy" and "timestamp" in data:
                print_test_result("Health Check Endpoint", True, f"Status: {data['status']}, Timestamp: {data['timestamp']}")
                return True
            else:
                print_test_result("Health Check Endpoint", False, "Invalid health response format")
                return False
        else:
            print_test_result("Health Check Endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
            return False
            
    except Exception as e:
        print_test_result("Health Check Endpoint", False, f"Exception: {str(e)}")
        return False

def test_contact_form_valid():
    """Test POST /api/contact with valid data"""
    print("🔍 Testing Contact Form - Valid Submission...")
    try:
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "+1-555-0123",
            "service": "Web Development",
            "message": "I need a professional website for my business. Please contact me to discuss requirements and pricing."
        }
        
        response = requests.post(f"{API_BASE}/contact", 
                               json=contact_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 201:
            data = response.json()
            if data.get("success") and "id" in data:
                print_test_result("Contact Form Valid Submission", True, f"Contact ID: {data['id']}")
                return True, data.get("id")
            else:
                print_test_result("Contact Form Valid Submission", False, "Invalid success response format")
                return False, None
        else:
            print_test_result("Contact Form Valid Submission", False, f"Status: {response.status_code}, Response: {response.text}")
            return False, None
            
    except Exception as e:
        print_test_result("Contact Form Valid Submission", False, f"Exception: {str(e)}")
        return False, None

def test_contact_form_missing_fields():
    """Test POST /api/contact with missing required fields"""
    print("🔍 Testing Contact Form - Missing Required Fields...")
    try:
        # Test missing name
        contact_data = {
            "email": "test@example.com",
            "service": "Web Development",
            "message": "Test message"
        }
        
        response = requests.post(f"{API_BASE}/contact", 
                               json=contact_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "Missing required fields" in data["error"]:
                print_test_result("Contact Form Missing Fields", True, f"Correctly rejected: {data['error']}")
                return True
            else:
                print_test_result("Contact Form Missing Fields", False, "Wrong error message format")
                return False
        else:
            print_test_result("Contact Form Missing Fields", False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Contact Form Missing Fields", False, f"Exception: {str(e)}")
        return False

def test_contact_form_invalid_email():
    """Test POST /api/contact with invalid email format"""
    print("🔍 Testing Contact Form - Invalid Email Format...")
    try:
        contact_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "service": "Web Development",
            "message": "Test message with invalid email"
        }
        
        response = requests.post(f"{API_BASE}/contact", 
                               json=contact_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "Invalid email address" in data["error"]:
                print_test_result("Contact Form Invalid Email", True, f"Correctly rejected: {data['error']}")
                return True
            else:
                print_test_result("Contact Form Invalid Email", False, "Wrong error message format")
                return False
        else:
            print_test_result("Contact Form Invalid Email", False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Contact Form Invalid Email", False, f"Exception: {str(e)}")
        return False

def test_get_contacts():
    """Test GET /api/contacts - List all contacts"""
    print("🔍 Testing Get Contacts Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/contacts", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "success" in data and data["success"] and "data" in data:
                contacts = data["data"]
                print_test_result("Get Contacts Endpoint", True, f"Retrieved {len(contacts)} contacts")
                
                # Verify contact structure if any contacts exist
                if contacts:
                    first_contact = contacts[0]
                    required_fields = ["id", "name", "email", "service", "message", "createdAt"]
                    missing_fields = [field for field in required_fields if field not in first_contact]
                    
                    if not missing_fields:
                        print(f"   ✅ Contact structure is valid")
                        return True
                    else:
                        print(f"   ❌ Missing fields in contact: {missing_fields}")
                        return False
                else:
                    print(f"   ℹ️  No contacts in database yet")
                    return True
            else:
                print_test_result("Get Contacts Endpoint", False, "Invalid response format")
                return False
        else:
            print_test_result("Get Contacts Endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
            return False
            
    except Exception as e:
        print_test_result("Get Contacts Endpoint", False, f"Exception: {str(e)}")
        return False

def test_nonexistent_endpoint():
    """Test accessing a non-existent endpoint"""
    print("🔍 Testing Non-existent Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/nonexistent", timeout=10)
        
        if response.status_code == 404:
            data = response.json()
            if "error" in data and "Endpoint not found" in data["error"]:
                print_test_result("Non-existent Endpoint", True, "Correctly returns 404")
                return True
            else:
                print_test_result("Non-existent Endpoint", False, "Wrong error format")
                return False
        else:
            print_test_result("Non-existent Endpoint", False, f"Expected 404, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Non-existent Endpoint", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print("=" * 60)
    print("🚀 PROBOX INFOTECH BACKEND API TESTING")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    print()
    
    # Track test results
    test_results = []
    
    # Run all tests
    test_results.append(("API Root Endpoint", test_api_root()))
    test_results.append(("Health Check Endpoint", test_health_endpoint()))
    test_results.append(("Contact Form Valid", test_contact_form_valid()[0]))
    test_results.append(("Contact Form Missing Fields", test_contact_form_missing_fields()))
    test_results.append(("Contact Form Invalid Email", test_contact_form_invalid_email()))
    test_results.append(("Get Contacts", test_get_contacts()))
    test_results.append(("Non-existent Endpoint", test_nonexistent_endpoint()))
    
    # Summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result in test_results if result)
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    print()
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())