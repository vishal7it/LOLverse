import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Wand2, Upload, Image } from 'lucide-react';
import { useMeme, Template } from '../../context/MemeContext';
import { useAuth } from '../../context/AuthContext';

const MemeCreator: React.FC = () => {
  const { templates, createMeme } = useMeme();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'template' | 'customize'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [textStroke, setTextStroke] = useState(true);

  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, setShowAuthModal]);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCustomImage(null);
    setStep('customize');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setSelectedTemplate(null);
          setStep('customize');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveMeme = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const imageUrl = customImage || (selectedTemplate?.imageUrl || '');
    
    createMeme({
      imageUrl,
      topText,
      bottomText,
      tags,
    });
    
    navigate('/dashboard');
  };

  const handleSuggestTags = () => {
    // In a real app, this would call an AI API to suggest tags
    // For demo purposes, we'll add some random tags
    const suggestedTags = ['funny', 'relatable', 'trending', 'viral', 'lol']
      .filter(tag => !tags.includes(tag))
      .slice(0, 3);
    
    setTags([...tags, ...suggestedTags].slice(0, 5));
  };

  const handleSuggestCaption = () => {
    // In a real app, this would call an AI API to suggest captions
    // For demo purposes, we'll just set some random text
    setTopText("WHEN YOU FINALLY");
    setBottomText("FINISH YOUR PROJECT");
  };

  if (step === 'template') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create New Meme</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Upload your own image</h3>
          <label className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <span className="block text-gray-500 dark:text-gray-400 mb-2">Click to upload an image</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG up to 5MB</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Or choose a template</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 dark:border-gray-700"
                onClick={() => handleTemplateSelect(template)}
              >
                <img 
                  src={template.imageUrl} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="text-xs text-white font-medium">{template.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <button
          onClick={() => setStep('template')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back</span>
        </button>
        <button
          onClick={handleSaveMeme}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          <Save className="w-4 h-4 mr-2" />
          <span>Save Meme</span>
        </button>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="relative mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div className="aspect-square max-h-[500px] flex items-center justify-center overflow-hidden">
              {(selectedTemplate || customImage) && (
                <div className="relative w-full h-full">
                  <img
                    ref={imageRef}
                    src={customImage || selectedTemplate?.imageUrl}
                    alt="Meme template"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-center">
                    {topText && (
                      <h3 
                        className={`text-[${fontSize}px] font-bold uppercase tracking-wider break-words ${
                          textStroke ? 'text-stroke' : ''
                        }`}
                        style={{ color: fontColor }}
                      >
                        {topText}
                      </h3>
                    )}
                    {bottomText && (
                      <h3 
                        className={`text-[${fontSize}px] font-bold uppercase tracking-wider break-words ${
                          textStroke ? 'text-stroke' : ''
                        }`}
                        style={{ color: fontColor }}
                      >
                        {bottomText}
                      </h3>
                    )}
                  </div>
                </div>
              )}
              {!selectedTemplate && !customImage && (
                <div className="flex flex-col items-center justify-center p-8">
                  <Image className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No image selected. Go back to choose a template or upload your own image.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Top Text
            </label>
            <div className="flex">
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="TOP TEXT"
                maxLength={50}
              />
              <button
                onClick={handleSuggestCaption}
                className="px-3 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 rounded-r-md hover:bg-purple-200 dark:hover:bg-purple-800"
                title="Suggest caption with AI"
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bottom Text
            </label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="BOTTOM TEXT"
              maxLength={50}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (up to 5)
            </label>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Add a tag and press Enter"
                disabled={tags.length >= 5}
              />
              <button
                onClick={handleSuggestTags}
                className="px-3 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 rounded-r-md hover:bg-purple-200 dark:hover:bg-purple-800"
                title="Suggest tags with AI"
                disabled={tags.length >= 5}
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full px-2 py-1 text-xs font-medium"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Size
            </label>
            <input
              type="range"
              min="16"
              max="64"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Color
            </label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="h-10 w-full rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="text-stroke"
              type="checkbox"
              checked={textStroke}
              onChange={(e) => setTextStroke(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="text-stroke" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Add text outline (for better readability)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCreator;