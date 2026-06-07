#!/usr/bin/env python3
"""Serveur local pour PokéWave — lance avec: python serve.py"""
import http.server, socketserver, os, webbrowser, threading

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # silencieux sauf erreurs

def open_browser():
    import time; time.sleep(0.5)
    webbrowser.open(f"http://localhost:{PORT}/index.html")

print(f"🎮 PokéWave serveur démarré → http://localhost:{PORT}/index.html")
print("   Ctrl+C pour arrêter\n")
threading.Thread(target=open_browser, daemon=True).start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServeur arrêté.")
