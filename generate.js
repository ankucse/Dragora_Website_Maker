const fs = require('fs');
const path = require('path');

const baseDir = "backend/src/main/java/com/websitebuilder/backend";
const dirs = ["config", "controller", "dto", "entity", "repository", "security", "service", "exception"];

dirs.forEach(d => {
    fs.mkdirSync(path.join(baseDir, d), { recursive: true });
});

const userJava = `package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private List<String> roles;
}`;

const projectJava = `package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
}`;

const pageJava = `package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "pages")
public class Page {
    @Id
    private String id;
    private String projectId;
    private String name;
    private Object components; // JSON structured pages
}`;

const pubSiteJava = `package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "published_sites")
public class PublishedSite {
    @Id
    private String id;
    private String projectId;
    private String url;
    private String htmlContent;
    private String cssContent;
}`;

fs.writeFileSync(path.join(baseDir, "entity/User.java"), userJava);
fs.writeFileSync(path.join(baseDir, "entity/Project.java"), projectJava);
fs.writeFileSync(path.join(baseDir, "entity/Page.java"), pageJava);
fs.writeFileSync(path.join(baseDir, "entity/PublishedSite.java"), pubSiteJava);

const userRepo = `package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}`;
const projectRepo = `package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByUserId(String userId);
}`;
const pageRepo = `package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PageRepository extends MongoRepository<Page, String> {
    List<Page> findByProjectId(String projectId);
}`;
const pubRepo = `package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.PublishedSite;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublishedSiteRepository extends MongoRepository<PublishedSite, String> {}`;

fs.writeFileSync(path.join(baseDir, "repository/UserRepository.java"), userRepo);
fs.writeFileSync(path.join(baseDir, "repository/ProjectRepository.java"), projectRepo);
fs.writeFileSync(path.join(baseDir, "repository/PageRepository.java"), pageRepo);
fs.writeFileSync(path.join(baseDir, "repository/PublishedSiteRepository.java"), pubRepo);

const secConfig = `package com.websitebuilder.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}`;
fs.writeFileSync(path.join(baseDir, "config/SecurityConfig.java"), secConfig);

const projController = `package com.websitebuilder.backend.controller;
import com.websitebuilder.backend.entity.Project;
import com.websitebuilder.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository repo;
    public ProjectController(ProjectRepository repo) { this.repo = repo; }
    
    @GetMapping
    public List<Project> getAll() { return repo.findAll(); }
    
    @PostMapping
    public Project create(@RequestBody Project p) { return repo.save(p); }
}`;
const pageController = `package com.websitebuilder.backend.controller;
import com.websitebuilder.backend.entity.Page;
import com.websitebuilder.backend.repository.PageRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pages")
public class PageController {
    private final PageRepository repo;
    public PageController(PageRepository repo) { this.repo = repo; }
    
    @GetMapping("/project/{projectId}")
    public List<Page> getByProject(@PathVariable String projectId) { return repo.findByProjectId(projectId); }
    
    @PostMapping
    public Page save(@RequestBody Page p) { return repo.save(p); }
}`;
fs.writeFileSync(path.join(baseDir, "controller/ProjectController.java"), projController);
fs.writeFileSync(path.join(baseDir, "controller/PageController.java"), pageController);

// Frontend generation
const baseDirFe = "frontend/src";
const dirsFe = ["components", "pages", "editor", "store"];

dirsFe.forEach(d => {
    fs.mkdirSync(path.join(baseDirFe, d), { recursive: true });
});

const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const postcssJs = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const tailwindJs = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

fs.writeFileSync("frontend/src/index.css", indexCss);
fs.writeFileSync("frontend/postcss.config.js", postcssJs);
fs.writeFileSync("frontend/tailwind.config.js", tailwindJs);

const appTsx = `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/editor/:projectId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;`;
fs.writeFileSync(path.join(baseDirFe, "App.tsx"), appTsx);

const storeTs = `import { create } from 'zustand';

interface PageComponent {
  id: string;
  type: string;
  content: string;
  styles: Record<string, any>;
}

interface EditorState {
  components: PageComponent[];
  selectedId: string | null;
  addComponent: (comp: PageComponent) => void;
  selectComponent: (id: string) => void;
  updateComponentStyles: (id: string, styles: Record<string, any>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  components: [],
  selectedId: null,
  addComponent: (comp) => set((state) => ({ components: [...state.components, comp] })),
  selectComponent: (id) => set({ selectedId: id }),
  updateComponentStyles: (id, styles) => set((state) => ({
    components: state.components.map(c => c.id === id ? { ...c, styles: { ...c.styles, ...styles } } : c)
  }))
}));`;
fs.writeFileSync(path.join(baseDirFe, "store/useEditorStore.ts"), storeTs);

const dashboardTsx = `import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <button 
        onClick={() => navigate('/editor/new')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create New Website
      </button>
    </div>
  );
}`;

const editorPageTsx = `import { Sidebar } from '../editor/Sidebar';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';

export default function EditorPage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          <span className="font-semibold">Website Builder</span>
          <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Publish</button>
        </div>
        <Canvas />
      </div>
      <PropertiesPanel />
    </div>
  );
}`;
fs.writeFileSync(path.join(baseDirFe, "pages/DashboardPage.tsx"), dashboardTsx);
fs.writeFileSync(path.join(baseDirFe, "pages/EditorPage.tsx"), editorPageTsx);

const sidebarTsx = `export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
      <h3 className="font-bold text-gray-700">Components</h3>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Hero Section</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Navbar</div>
      <div className="p-3 border rounded bg-gray-50 cursor-grab hover:bg-gray-100">Text Block</div>
    </div>
  );
}`;
const canvasTsx = `import { useEditorStore } from '../store/useEditorStore';

export function Canvas() {
  const components = useEditorStore(s => s.components);
  return (
    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
      <div className="w-full max-w-4xl min-h-[800px] bg-white shadow-lg relative rounded border border-dashed border-gray-300">
         {components.length === 0 && (
           <div className="absolute inset-0 flex items-center justify-center text-gray-400">
             Drag components here
           </div>
         )}
      </div>
    </div>
  );
}`;
const propsTsx = `import { useEditorStore } from '../store/useEditorStore';

export function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId);
  return (
    <div className="w-72 bg-white border-l p-4">
      <h3 className="font-bold text-gray-700 mb-4">Properties</h3>
      {selectedId ? (
        <div className="text-sm">Editing component {selectedId}</div>
      ) : (
        <div className="text-sm text-gray-400">Select a component to edit</div>
      )}
    </div>
  );
}`;
fs.writeFileSync(path.join(baseDirFe, "editor/Sidebar.tsx"), sidebarTsx);
fs.writeFileSync(path.join(baseDirFe, "editor/Canvas.tsx"), canvasTsx);
fs.writeFileSync(path.join(baseDirFe, "editor/PropertiesPanel.tsx"), propsTsx);

console.log("Code generation complete.");
