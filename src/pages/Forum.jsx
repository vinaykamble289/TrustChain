
import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Send, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { doc, setDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/config";

const auth = getAuth();

const Forum = ({ postId = "defaultPost" }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    likes: 0,
    likedBy: [],
    comments: [],
  });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postRef = doc(db, "forumPosts", postId);
    const unsubscribe = onSnapshot(postRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Ensure likedBy array exists
        if (!data.likedBy) data.likedBy = [];
        // Ensure each comment has likedBy array
        data.comments = data.comments.map(comment => ({
          ...comment,
          likedBy: comment.likedBy || []
        }));
        setPost(data);
      } else {
        try {
          await setDoc(postRef, {
            title: "How does Blockchain help in academic verification?",
            content: "I'm building a decentralized verification system. How do I ensure it's secure and scalable?",
            likes: 0,
            likedBy: [],
            comments: [],
          });
        } catch (error) {
          console.error("Error creating default post:", error.message);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleLike = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in to like the post.");
    
    try {
      const postRef = doc(db, "forumPosts", postId);
      const userIndex = post.likedBy.indexOf(user.uid);
      let newLikes = post.likes;
      let newLikedBy = [...post.likedBy];
      
      if (userIndex === -1) {
        // Add like
        newLikes += 1;
        newLikedBy.push(user.uid);
      } else {
        // Remove like
        newLikes = Math.max(0, newLikes - 1);
        newLikedBy.splice(userIndex, 1);
      }
      
      await updateDoc(postRef, {
        likes: newLikes,
        likedBy: newLikedBy
      });
    } catch (error) {
      console.error("Error updating likes:", error.message);
    }
  };

  const addComment = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in to comment.");
    if (!newComment.trim()) return;
    
    try {
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          text: newComment,
          likes: 0,
          likedBy: [],
          replies: [],
          createdAt: new Date().toISOString(),
          author: user.displayName || "Anonymous",
          authorId: user.uid,
          authorPhoto: user.photoURL || "",
        }),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleCommentLike = async (commentIndex) => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in to like a comment.");
    
    try {
      const postRef = doc(db, "forumPosts", postId);
      const updatedComments = [...post.comments];
      const comment = updatedComments[commentIndex];
      
      // Ensure likedBy array exists
      if (!comment.likedBy) comment.likedBy = [];
      
      const userIndex = comment.likedBy.indexOf(user.uid);
      
      if (userIndex === -1) {
        // Add like
        comment.likes += 1;
        comment.likedBy.push(user.uid);
      } else {
        // Remove like
        comment.likes = Math.max(0, comment.likes - 1);
        comment.likedBy.splice(userIndex, 1);
      }
      
      await updateDoc(postRef, {
        comments: updatedComments
      });
    } catch (error) {
      console.error("Error liking comment:", error.message);
    }
  };

  const handleReply = async (commentIndex, replyText) => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in to reply.");
    if (!replyText.trim()) return;
    
    try {
      const postRef = doc(db, "forumPosts", postId);
      const updatedComments = [...post.comments];
      updatedComments[commentIndex].replies.push({
        text: replyText,
        createdAt: new Date().toISOString(),
        author: user.displayName || "Anonymous",
        authorId: user.uid,
        authorPhoto: user.photoURL || "",
      });
      
      await updateDoc(postRef, {
        comments: updatedComments
      });
    } catch (error) {
      console.error("Error replying to comment:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
          Loading community discussions...
        </div>
      </div>
    );
  }

  const user = auth.currentUser;
  const isPostLiked = user && post.likedBy && post.likedBy.includes(user.uid);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-10 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6">
            <h1 className="text-3xl font-bold text-center">Community Hub</h1>
            <p className="text-purple-100 mt-1 text-center">
              Connect, collaborate, and grow with peers
            </p>
          </div>

          <div className="p-8 space-y-8">
            <div className="border-b border-purple-100 pb-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                  Q
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2 leading-relaxed">{post.content}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center mt-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                    isPostLiked 
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                      : "bg-white text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isPostLiked ? "fill-white" : ""}`} />
                  <span>{Math.max(0, post.likes)} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
                <span className="text-purple-500 text-sm font-medium">
                  {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <MessageCircle className="text-purple-500" />
                <span>Community Discussion</span>
              </h3>

              <div className="space-y-6">
                {post.comments.length === 0 ? (
                  <div className="text-center py-8 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
                    <p className="text-purple-500">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                ) : (
                  post.comments.map((comment, idx) => (
                    <CommentItem
                      key={idx}
                      comment={comment}
                      onLike={() => handleCommentLike(idx)}
                      onReply={(replyText) => handleReply(idx, replyText)}
                    />
                  ))
                )}
              </div>

              <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your knowledge or ask a question..."
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm resize-none bg-white/70 backdrop-blur-sm"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={addComment}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({ comment, onLike, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [expanded, setExpanded] = useState(true);
  
  const user = auth.currentUser;
  const isLiked = user && comment.likedBy && comment.likedBy.includes(user.uid);

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          {comment.authorPhoto ? (
            <img 
              src={comment.authorPhoto} 
              alt={comment.author} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {comment.author?.charAt(0) || "A"}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">{comment.author || "Anonymous"}</span>
              <span className="text-xs text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full">
                {comment.authorId === user?.uid ? "You" : "Member"}
              </span>
            </div>
            <p className="text-gray-700 mt-1">{comment.text}</p>
          </div>
        </div>
        <button
          onClick={onLike}
          className={`flex items-center text-sm ml-4 ${
            isLiked ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
          }`}
        >
          <Heart 
            className={`w-4 h-4 mr-1 ${
              isLiked ? "fill-rose-500" : ""
            }`} 
          /> 
          {Math.max(0, comment.likes)}
        </button>
      </div>

      <div className="flex items-center justify-between mt-3 ml-13">
        <div className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowReply(!showReply)}
            className={`text-xs font-medium ${
              showReply 
                ? "text-purple-600 bg-purple-100 px-2 py-1 rounded-full" 
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            {showReply ? "Cancel" : "Reply"}
          </button>
          {comment.replies.length > 0 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-500 hover:text-purple-600 font-medium flex items-center"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" /> Hide replies
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" /> Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {expanded && comment.replies.length > 0 && (
        <div className="ml-13 mt-4 space-y-3 border-l-2 border-purple-200 pl-4">
          {comment.replies.map((reply, i) => (
            <div key={i} className="bg-white/50 p-3 rounded-lg shadow-xs backdrop-blur-sm">
              <div className="flex items-start gap-2">
                {reply.authorPhoto ? (
                  <img 
                    src={reply.authorPhoto} 
                    alt={reply.author} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-purple-300 to-indigo-300 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                    {reply.author?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">{reply.author || "User"}</span>
                    {reply.authorId === user?.uid && (
                      <span className="text-xs text-purple-500 bg-purple-100 px-1.5 py-0.5 rounded-full">You</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-0.5">{reply.text}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(reply.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReply && (
        <div className="ml-13 mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.author || "Anonymous"}...`}
              className="flex-1 px-3 py-2 border border-purple-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white/70"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onReply(replyText);
                  setReplyText("");
                  setShowReply(false);
                }
              }}
            />
            <button
              onClick={() => {
                onReply(replyText);
                setReplyText("");
                setShowReply(false);
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;