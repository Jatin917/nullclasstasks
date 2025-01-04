import React, { useState, useEffect, useRef } from 'react';
import { Share2, Copy, Facebook, X } from 'lucide-react';
import { staticTranslator } from '../../services';

const ShareDialog = ({ postId, postTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);
  const targetLang = localStorage.getItem("lang");

  const shareUrl = `${window.location.origin}/Posts/${postId}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Social media share URLs
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const styles = {
    container: {
      position: "relative",
    },
    shareButton: {
      padding: "0.25rem",
      backgroundColor: "inherit",
      border:"none",
      outline:"none",
      borderRadius: "0.25rem",
      color: "gray",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    modalOverlay: {
      position: "fixed",
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      margin: "1rem",
      padding: "1rem",
    },
    header: {
      wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      },
      title: {
        fontSize: "1.125rem",
        fontWeight: "500",
      },
      closeButton: {
        backgroundColor: "inherit",
      border:"none",
      outline:"none",
        color: "gray",
        fontSize: "1.25rem",
        cursor: "pointer",
        transition: "color 0.2s",
      },
    },
    copySection: {
      wrapper: {
        marginBottom: "1rem",
      },
      container: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.5rem",
      },
      input: {
        flex: 1,
        border: "1px solid #ddd",
        borderRadius: "0.25rem",
        padding: "0.5rem",
        fontSize: "0.875rem",
        backgroundColor: "#f9f9f9",
      },
      button: (copied) => ({
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        color: "white",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: copied ? "#22c55e" : "#3b82f6",
        cursor: "pointer",
        transition: "background-color 0.2s",
      border:"none",
      outline:"none",
      }),
      icon: {
        marginRight: "0.5rem",
      },
    },
    socialButtons: {
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.75rem",
        marginBottom: "1rem",
      },
      button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 1rem",
        // border: "1px solid #ddd",
        borderRadius: "0.25rem",
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "background-color 0.2s",
      border:"none",
      outline:"none",
      },
      icon: {
        marginRight: "0.5rem",
      },
    },
    tips: {
      container: {
        fontSize: "0.875rem",
        color: "gray",
        backgroundColor: "#f9f9f9",
        padding: "0.75rem",
        borderRadius: "0.25rem",
      },
      title: {
        fontWeight: "500",
        marginBottom: "0.5rem",
      },
      list: {
        listStyleType: "disc",
        paddingLeft: "1rem",
      },
    },
  };
  
  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.shareButton}
        title="Share this post"
      >
        <Share2 size={24} />
      </button>
  
      {isOpen && (
        <div style={styles.modalOverlay}>
          <div ref={dialogRef} style={styles.modalContent}>
            {/* Dialog Header */}
            <div style={styles.header.wrapper}>
              <h2 style={styles.header.title}>{staticTranslator("Share", targetLang)}</h2>
              <button
                onClick={() => setIsOpen(false)}
                style={styles.header.closeButton}
              >
                ×
              </button>
            </div>
  
            <div style={styles.copySection.wrapper}>
              <div style={styles.copySection.container}>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  style={styles.copySection.input}
                />
                <button
                  onClick={handleCopy}
                  style={styles.copySection.button(copied)}
                >
                  <Copy size={16} style={styles.copySection.icon} />
                  {copied
                    ? staticTranslator("Copied!", targetLang)
                    : staticTranslator("Copy", targetLang)}
                </button>
              </div>
            </div>
  
            <div style={styles.socialButtons.grid}>
              <button
                onClick={() => window.open(twitterShareUrl, "_blank")}
                style={styles.socialButtons.button}
              >
                <X size={16} style={styles.socialButtons.icon} />
                X
              </button>
              <button
                onClick={() => window.open(facebookShareUrl, "_blank")}
                style={styles.socialButtons.button}
              >
                <Facebook size={16} style={styles.socialButtons.icon} />
                {staticTranslator("Facebook", targetLang)}
              </button>
            </div>
  
            <div style={styles.tips.container}>
              <h4 style={styles.tips.title}>
                {staticTranslator("Share a link to this post", targetLang)}
              </h4>
              <ul style={styles.tips.list}>
                <li>{staticTranslator("Copy link to clipboard", targetLang)}</li>
                <li>{staticTranslator("Share on social media", targetLang)}</li>
                <li>
                  {staticTranslator(
                    "The link will redirect to this specific post",
                    targetLang
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ShareDialog;