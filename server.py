#!/usr/bin/env python3
"""
Simple HTTP Server for Smart Attendance System
Run this to host the app locally and share via URL
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Get the directory where this script is located
SERVER_DIR = Path(__file__).parent

# Server configuration
PORT = 8000
HOSTNAME = "localhost"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SERVER_DIR), **kwargs)

    def end_headers(self):
        # Prevent caching for development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        return super().end_headers()

def run_server():
    """Start the HTTP server"""
    os.chdir(SERVER_DIR)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://{HOSTNAME}:{PORT}"
        print("\n" + "="*60)
        print("🎉 Smart Attendance System Server Started!")
        print("="*60)
        print(f"\n📍 Local URL:     {url}")
        print(f"📍 Local Network: http://YOUR_IP:{PORT}")
        print(f"\n📂 Serving from:  {SERVER_DIR}")
        print("\n✅ Opening app in browser...")
        print("\n💡 Tips:")
        print("   - Share URL with others on same network")
        print("   - Keep this window open while using app")
        print("   - Press Ctrl+C to stop server")
        print("\n" + "="*60 + "\n")
        
        # Open in default browser
        try:
            webbrowser.open(url)
        except:
            print(f"⚠️  Please open {url} in your browser manually")
        
        # Keep server running
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped!")
            print("="*60)

if __name__ == "__main__":
    run_server()
