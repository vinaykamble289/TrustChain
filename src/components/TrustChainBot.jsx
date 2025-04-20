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
      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1463ee17105935545f215810d3b00438f12381ffd3faecfbcece63c2b5f8f4e3', // Replace with your actual key
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3-70b-chat-hf',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7,
        }),
      });


      const data = await response.json();
      console.log('API response:', data);
      
      // Update this according to your API’s structure
      const botReply = data.choices?.[0]?.message?.content || 'No valid reply.';
setAnswer(botReply);

    } catch (err) {
      console.error('Error connecting to LLaMA 4 API:', err);
      setAnswer('Error connecting to online LLaMA 4 model.');
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
