// components/TrustChainBot.jsx
import { useState } from 'react';

const TrustChainBot = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer('Error fetching answer from bot.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">📚 TrustChain Assistant</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Ask something about certificate or results..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && (
        <div className="mt-4 p-3 bg-white border rounded">
          <strong>Bot:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default TrustChainBot;
