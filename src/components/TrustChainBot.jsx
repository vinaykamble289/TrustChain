import { useState } from 'react';

const TrustChainBot = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: query,
          stream: false,
        }),
      });

      const data = await response.json();
      setAnswer(data.response || 'No response from LLaMA.');
    } catch (err) {
      console.error('Error connecting to LLaMA 3 via Ollama:', err);
      setAnswer('Error connecting to local LLaMA model.');
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
        <div className="mt-4 p-3 bg-white border rounded whitespace-pre-wrap">
          <strong>Bot:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default TrustChainBot;
