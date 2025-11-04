from flask import Flask, request,jsonify
from service import ChatServiceFactory
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# chat_service = ChatServiceFactory.create_service()

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"status": "API is working"}), 200
    

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get("message", "")
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        service = ChatServiceFactory.create_service()
        response = service.get_response(message)
        
        return jsonify({"answer": response})  # ✅ this key is what frontend expects

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run()