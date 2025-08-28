
import React, { createContext, useState, useContext } from 'react';

const ProjectReloadContext = createContext();

export const ProjectReloadProvider = ({ children }) => {
  const [shouldReload, setShouldReload] = useState(false);

  return (
    <ProjectReloadContext.Provider value={{ shouldReload, setShouldReload }}>
      {children}
    </ProjectReloadContext.Provider>
  );
};

export const useProjectReload = () => useContext(ProjectReloadContext);
