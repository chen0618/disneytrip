import { createContext, useState } from 'react';

export const ActiveSectionContext = createContext('hero');
export const SetActiveSectionContext = createContext(() => {});

export default function ActiveSectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState('hero');
  return (
    <ActiveSectionContext.Provider value={activeSection}>
      <SetActiveSectionContext.Provider value={setActiveSection}>
        {children}
      </SetActiveSectionContext.Provider>
    </ActiveSectionContext.Provider>
  );
}
