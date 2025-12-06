import { supabase } from './supabase';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const profanityFilter = (text: string): boolean => {
  // Basic profanity filter - in production, use a comprehensive list
  const badWords = ['spam', 'scam', 'fake', 'cheat', 'fraud'];
  const lowercaseText = text.toLowerCase();
  return !badWords.some(word => lowercaseText.includes(word));
};

export const checkRateLimit = async (ip: string): Promise<boolean> => {
  // Simple client-side rate limiting using localStorage
  const lastPostKey = `lastPost_${ip}`;
  const lastPost = localStorage.getItem(lastPostKey);

  if (!lastPost) return true; // First time poster

  const lastPostDate = new Date(lastPost);
  const now = new Date();
  const hoursElapsed = (now.getTime() - lastPostDate.getTime()) / (1000 * 60 * 60);

  return hoursElapsed >= 24;
};

export const updateRateLimit = async (ip: string): Promise<void> => {
  // Store rate limit in localStorage
  const lastPostKey = `lastPost_${ip}`;
  localStorage.setItem(lastPostKey, new Date().toISOString());
};

export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return 'unknown';
  }
};