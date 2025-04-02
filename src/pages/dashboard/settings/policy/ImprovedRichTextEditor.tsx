// ImprovedRichTextEditor.tsx
// PersistentRichTextEditor.tsx
import React, { useRef, useEffect, useState } from 'react';
import './improved-editor-styles.css';

interface ImprovedRichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const ImprovedRichTextEditor: React.FC<ImprovedRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [fontFamily, setFontFamily] = useState('Sans Serif');
  const [activeStyles, setActiveStyles] = useState<{ [key: string]: boolean }>({});
  
  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current) {
      // Only update the innerHTML if the value has changed and doesn't match current content
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  // Check for active styles on selection change
// Check for active styles on selection change
useEffect(() => {
  const checkActiveStyles = () => {
    const newActiveStyles: { [key: string]: boolean } = {};
    
    newActiveStyles.bold = document.queryCommandState('bold');
    newActiveStyles.italic = document.queryCommandState('italic');
    newActiveStyles.underline = document.queryCommandState('underline');
    newActiveStyles.strikeThrough = document.queryCommandState('strikeThrough');
    newActiveStyles.orderedList = document.queryCommandState('insertOrderedList');
    newActiveStyles.unorderedList = document.queryCommandState('insertUnorderedList');
    newActiveStyles.justifyLeft = document.queryCommandState('justifyLeft');
    newActiveStyles.justifyCenter = document.queryCommandState('justifyCenter');
    newActiveStyles.justifyRight = document.queryCommandState('justifyRight');
    newActiveStyles.superscript = document.queryCommandState('superscript');
    
    setActiveStyles(newActiveStyles);
  };

  // Track selection changes
  document.addEventListener('selectionchange', checkActiveStyles);
  
  // Store a reference to the current editor element
  const currentEditorRef = editorRef.current;
  
  // Initial check
  if (currentEditorRef) {
    currentEditorRef.addEventListener('click', checkActiveStyles);
    currentEditorRef.addEventListener('keyup', checkActiveStyles);
  }
  
  return () => {
    document.removeEventListener('selectionchange', checkActiveStyles);
    if (currentEditorRef) {
      currentEditorRef.removeEventListener('click', checkActiveStyles);
      currentEditorRef.removeEventListener('keyup', checkActiveStyles);
    }
  };
}, []);

  // Execute command for formatting
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    saveContent();
    
    // Refocus the editor
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Handle font family change
  const handleFontFamilyChange = (font: string) => {
    setFontFamily(font);
    let fontValue = '';
    
    switch(font) {
      case 'Normal':
        fontValue = 'Arial, sans-serif';
        break;
      case 'Sans Serif':
        fontValue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
        break;
      case 'Serif':
        fontValue = 'Georgia, Times, "Times New Roman", serif';
        break;
      case 'Monospace':
        fontValue = 'Consolas, Monaco, "Courier New", Courier, monospace';
        break;
      default:
        fontValue = 'Arial, sans-serif';
    }
    
    execCommand('fontName', fontValue);
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Create a FormData object for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "urban_image"); // Use your Cloudinary preset
      
      // Upload to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dngyazspl/image/upload", // Use your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      
      const result = await response.json();
      if (result.secure_url) {
        // Insert the Cloudinary URL as an image
        execCommand('insertImage', result.secure_url);
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image", error);
      
      // Fallback to local data URL if Cloudinary fails
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          execCommand('insertImage', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save content to parent component
  const saveContent = () => {
    if (editorRef.current) {
      // Make sure all images have proper styling
      const images = editorRef.current.querySelectorAll('img');
      images.forEach(img => {
        if (!img.style.maxWidth) {
          img.style.maxWidth = '100%';
        }
        if (!img.getAttribute('data-persistent')) {
          img.setAttribute('data-persistent', 'true');
        }
      });
      
      onChange(editorRef.current.innerHTML);
    }
  };

  // Handles paste to strip formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Insert text at cursor position
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="improved-editor">
      {/* Hidden file input for image upload */}
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      
      {/* Formatting Toolbar */}
      <div className="improved-editor-toolbar">
        {/* Font Family Dropdown */}
        <div className="toolbar-dropdown">
          <select 
            value={fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            className="toolbar-select"
          >
            <option value="Normal">Normal</option>
            <option value="Sans Serif">Sans Serif</option>
            <option value="Serif">Serif</option>
            <option value="Monospace">Monospace</option>
          </select>
        </div>

        <div className="toolbar-divider"></div>
        
        {/* Text Style Buttons */}
        <button 
          type="button" 
          onClick={() => execCommand('bold')}
          className={`toolbar-button ${activeStyles.bold ? 'active' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('italic')}
          className={`toolbar-button ${activeStyles.italic ? 'active' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('underline')}
          className={`toolbar-button ${activeStyles.underline ? 'active' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        
        <button 
          type="button" 
          onClick={() => {
            const url = prompt('Enter link URL', 'https://');
            if (url) execCommand('createLink', url);
          }}
          className="toolbar-button"
          title="Insert Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        
        <div className="toolbar-divider"></div>
        
        {/* Quote & Code */}
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="toolbar-button"
          title="Quote"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<pre>')}
          className="toolbar-button"
          title="Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </button>
        
        <div className="toolbar-divider"></div>
        
        {/* Lists - Fixed implementation */}
        <button 
          type="button" 
          onClick={() => {
            document.execCommand('insertUnorderedList', false);
            saveContent();
          }}
          className={`toolbar-button ${activeStyles.unorderedList ? 'active' : ''}`}
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={() => {
            document.execCommand('insertOrderedList', false);
            saveContent();
          }}
          className={`toolbar-button ${activeStyles.orderedList ? 'active' : ''}`}
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>
        
        <button 
          type="button" 
          onClick={() => execCommand('indent')}
          className="toolbar-button"
          title="Indent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="8" x2="21" y2="8"></line>
            <line x1="3" y1="16" x2="21" y2="16"></line>
            <line x1="9" y1="12" x2="21" y2="12"></line>
            <line x1="7" y1="12" x2="3" y2="16"></line>
            <line x1="3" y1="8" x2="7" y2="12"></line>
          </svg>
        </button>
        
        <div className="toolbar-divider"></div>
        
        {/* Special Characters and Operations */}
        <button 
          type="button" 
          onClick={() => execCommand('strikeThrough')}
          className={`toolbar-button ${activeStyles.strikeThrough ? 'active' : ''}`}
          title="Strikethrough"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.3 4.9c-2.3-.6-4.4-.4-6.2.5-2.2 1.1-3.6 3.1-3.8 5.4-.3 2.8 1 5 3.6 5.8 1.2.4 2.7.2 3.8-.4 1.2-.6 1.9-1.4 2.4-2.4"></path>
            <path d="M19 9 L5 21"></path>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('superscript')}
          className={`toolbar-button ${activeStyles.superscript ? 'active' : ''}`}
          title="Superscript"
        >
          x<sup>2</sup>
        </button>
        
        <div className="toolbar-divider"></div>
        
        {/* Alignment */}
        <button 
          type="button" 
          onClick={() => execCommand('justifyLeft')}
          className={`toolbar-button ${activeStyles.justifyLeft ? 'active' : ''}`}
          title="Align Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="15" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('justifyCenter')}
          className={`toolbar-button ${activeStyles.justifyCenter ? 'active' : ''}`}
          title="Align Center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="6" y1="12" x2="18" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('justifyRight')}
          className={`toolbar-button ${activeStyles.justifyRight ? 'active' : ''}`}
          title="Align Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="9" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="toolbar-divider"></div>
        
        {/* Special Formatting */}
        <button 
          type="button" 
          onClick={() => execCommand('removeFormat')}
          className="toolbar-button"
          title="Clear Formatting"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="4" x2="20" y2="20"></line>
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4"></path>
          </svg>
        </button>
        
        <button 
          type="button" 
          onClick={() => {
            if (window.getSelection) {
              const selection = window.getSelection();
              if (selection?.toString()) {
                // Get selection color
                const color = prompt('Enter color (name, hex or rgb)', 'red');
                if (color) execCommand('foreColor', color);
              }
            }
          }}
          className="toolbar-button"
          title="Text Color"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6v2H9zM7 5h10v2H7z"></path>
            <path d="M5 7h14v2H5z"></path>
            <path d="M3 9h18v2H3z"></path>
            <path d="M5 11h14v2H5z"></path>
            <path d="M7 13h10v2H7z"></path>
            <path d="M9 15h6v2H9z"></path>
            <path d="M11 17h2v2h-2z"></path>
          </svg>
        </button>
        
        {/* Fixed local image upload - Now uploads to Cloudinary */}
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="toolbar-button"
          title="Insert Image from Computer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>
        
        {/* Headers */}
        <div className="toolbar-divider"></div>
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<h1>')}
          className="toolbar-button"
          title="Heading 1"
        >
          H1
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="toolbar-button"
          title="Heading 2"
        >
          H2
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<h3>')}
          className="toolbar-button"
          title="Heading 3"
        >
          H3
        </button>
        <button 
          type="button" 
          onClick={() => execCommand('formatBlock', '<p>')}
          className="toolbar-button"
          title="Paragraph"
        >
          P
        </button>
      </div>
      
      {/* Editable Content Area */}
      <div
        ref={editorRef}
        className={`improved-editor-content ${!value && !isFocused ? 'empty' : ''}`}
        contentEditable
        onInput={saveContent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={handlePaste}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default ImprovedRichTextEditor;