import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function AIChat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const userId = 3;
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQ4OTMzNzgxLCJleHAiOjE3NDkwMjAxODF9.XVxF-QW8ciDsM4cd6MLPBC5YSJztlhQbNhrjtpHCfRk";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newUserMessage = { sender: 'user', text: message };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/ai/chat',
        { userId, message },
        {
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );

      const aiReply = res.data.reply || 'No response from AI';
      setChatHistory((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: 'Error: ' + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setChatHistory([]);
    setMessage('');
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <div className="p-4 border-b text-xl font-semibold bg-white shadow flex justify-between items-center">
        <span>AI Finance Assistant</span>
        <button
          onClick={startNewChat}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
        >
          Start New Chat
        </button>
      </div>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {chatHistory.map((msg, index) => {
          // Clean multiple blank lines into a single line break to avoid huge gaps
          const cleanText = msg.text.replace(/\n{2,}/g, '\n');

          return (
            <div
              key={index}
              className={`p-3 rounded shadow max-w-[80%] break-words ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white self-end ml-auto'
                  : 'bg-white border self-start mr-auto'
              }`}
            >
              {msg.sender === 'ai' ? (
                <div className="prose prose-sm prose-blue max-w-none [&>p]:my-1 [&>p]:leading-snug">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-1" {...props} /> // smaller margin bottom
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                      code: ({ node, inline, className, children, ...props }) =>
                        inline ? (
                          <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-100 p-2 rounded overflow-x-auto" {...props}>
                            <code>{children}</code>
                          </pre>
                        ),
                      a: ({ node, ...props }) => (
                        <a className="text-blue-600 underline" {...props} />
                      ),
                    }}
                  >
                    {cleanText}
                  </ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-white flex items-center gap-2"
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 border border-gray-300 rounded px-4 py-2 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default AIChat;

