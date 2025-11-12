"use client";

import { useEffect } from "react";

export function ForceLightMode() {
  useEffect(() => {
    // Force light mode on client side
    const html = document.documentElement;
    const body = document.body;
    
    // Remove dark class and add light
    html.classList.remove("dark");
    html.classList.add("light");
    html.style.colorScheme = "light";
    
    // Force body background and text color
    body.style.backgroundColor = "#fafafa";
    body.style.color = "#1a1a1a";
    
    // Override any system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      html.style.colorScheme = "light";
      body.style.backgroundColor = "#fafafa";
      body.style.color = "#1a1a1a";
    }
    
    // Add a style tag to override all dark mode classes
    const style = document.createElement("style");
    style.id = "force-light-mode";
    style.textContent = `
      /* Force light mode - override all dark: classes */
      html.dark *,
      html *[class*="dark:"] {
        color: inherit !important;
      }
      
      html.dark h1,
      html.dark h2,
      html.dark h3,
      html.dark h4,
      html.dark h5,
      html.dark h6,
      html.dark p,
      html.dark span,
      html.dark div {
        color: #1a1a1a !important;
      }
      
      html.dark [class*="dark:text-white"],
      html.dark [class*="dark:text-gray-100"],
      html.dark [class*="dark:text-gray-200"],
      html.dark [class*="dark:text-gray-300"],
      html.dark [class*="dark:text-gray-400"] {
        color: #1a1a1a !important;
      }
      
      html.dark [class*="dark:text-gray-500"],
      html.dark [class*="dark:text-gray-600"] {
        color: #737373 !important;
      }
      
      html.dark [class*="dark:bg-gray-900"],
      html.dark [class*="dark:bg-gray-800"],
      html.dark [class*="dark:bg-gray-950"] {
        background-color: #ffffff !important;
      }
    `;
    
    // Remove existing style if present
    const existingStyle = document.getElementById("force-light-mode");
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(style);
    
    // Listen for changes and force light mode
    const handler = () => {
      html.classList.remove("dark");
      html.classList.add("light");
      html.style.colorScheme = "light";
      body.style.backgroundColor = "#fafafa";
      body.style.color = "#1a1a1a";
    };
    
    mediaQuery.addEventListener("change", handler);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
      const styleToRemove = document.getElementById("force-light-mode");
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);

  return null;
}

