
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface TranslationData {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: TranslationData = {
  "app_name": { en: "SereneHaven Suite", es: "SereneHaven Suite" },
  "dashboard": { en: "Dashboard", es: "Tablero" },
  "residents": { en: "Residents", es: "Residentes" },
  "staff": { en: "Staff", es: "Personal" },
  "billing": { en: "Billing", es: "Facturación" },
  "health": { en: "Health Logs", es: "Registros Médicos" },
  "activities": { en: "Activities", es: "Actividades" },
  "ai_updates": { en: "AI Family Updates", es: "Actualizaciones AI" },
  "settings": { en: "Settings", es: "Configuración" },
  "search": { en: "Search...", es: "Buscar..." },
  "add_new": { en: "Add New", es: "Agregar Nuevo" },
  "save": { en: "Save", es: "Guardar" },
  "cancel": { en: "Cancel", es: "Cancelar" },
  "loading": { en: "Loading...", es: "Cargando..." },
  "welcome_back": { en: "Welcome back", es: "Bienvenido de nuevo" },
  "total_residents": { en: "Total Residents", es: "Total de Residentes" },
  "pending_tasks": { en: "Pending Tasks", es: "Tareas Pendientes" },
  "active_staff": { en: "Active Staff", es: "Personal Activo" },
  "revenue_month": { en: "Revenue (Month)", es: "Ingresos (Mes)" },
  "mexico_detected": { en: "Detected location: Mexico. Switching to Spanish.", es: "Ubicación detectada: México. Cambiando a español." }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Simple mock detection for Mexico locale
    const isMexico = Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Mexico') || 
                     navigator.language.startsWith('es-MX');
    
    if (isMexico) {
      setLanguage('es');
    }
  }, []);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
