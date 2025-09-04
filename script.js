// Security Tools Directory - JavaScript
let toolsData = [];
let filteredTools = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadToolsData();
    setupScrollAnimations();
    setupEventListeners();
    setupSmoothScrolling();
});

// Load tools data
async function loadToolsData() {
    try {
        const response = await fetch('tools-data.json');
        toolsData = await response.json();
        filteredTools = [...toolsData];
        renderAllTools();
    } catch (error) {
        console.error('Error loading tools data:', error);
        loadFallbackData();
        filteredTools = [...toolsData];
        renderAllTools();
    }
}

// Fallback data if JSON file is not available
function loadFallbackData() {
    toolsData = [
        {
            "name": "Kkerlan (Kernel Analysis)",
            "description": "Kernel vulnerability analysis tool for system-level security assessment and deep system analysis.",
            "executable": "kkerlan.exe",
            "category": "Core",
            "platform": "Windows",
            "risk_level": "high"
        },
        {
            "name": "Zeuse Framework",
            "description": "Advanced penetration testing framework with comprehensive exploitation capabilities.",
            "executable": "zeuse.exe",
            "category": "Core",
            "platform": "Cross-platform",
            "risk_level": "high"
        },
        {
            "name": "Script-wave Analyzer",
            "description": "Automated script execution and wave analysis tool for network security assessment.",
            "executable": "script-wave.exe",
            "category": "Core",
            "platform": "Windows",
            "risk_level": "medium"
        },
        {
            "name": "Amp-gg Network Tool",
            "description": "Network amplification attack testing tool for stress testing network infrastructure.",
            "executable": "amp-gg.exe",
            "category": "Core",
            "platform": "Cross-platform",
            "risk_level": "high"
        },
        {
            "name": "Delta PC Analyzer",
            "description": "PC-based delta analysis and interpolation tool for system comparisons.",
            "executable": "delta.exe",
            "category": "Core",
            "platform": "Windows",
            "risk_level": "medium"
        },
        {
            "name": "Fluus Traffic Analyzer",
            "description": "Fluid dynamics analysis for network traffic patterns and behavior analysis.",
            "executable": "fluus.exe",
            "category": "Core",
            "platform": "Windows",
            "risk_level": "medium"
        },
        {
            "name": "Synapse X Framework",
            "description": "Advanced exploitation framework with powerful injection capabilities.",
            "executable": "synapse-x.exe",
            "category": "Core",
            "platform": "Windows",
            "risk_level": "very_high"
        },
        {
            "name": "Xeno Scanner",
            "description": "Cross-platform vulnerability scanner with comprehensive detection capabilities.",
            "executable": "xeno.exe",
            "category": "Vulnerability",
            "platform": "Cross-platform",
            "risk_level": "medium"
        },
        {
            "name": "SQLmap Injector",
            "description": "Automatic SQL injection detection and exploitation tool for database security testing.",
            "executable": "sqlmap.exe",
            "category": "Vulnerability",
            "platform": "Cross-platform",
            "risk_level": "high"
        },
        {
            "name": "Valex Detector",
            "description": "Value extraction and leak detection tool for sensitive data analysis.",
            "executable": "valex.exe",
            "category": "Vulnerability",
            "platform": "Windows",
            "risk_level": "medium"
        },
        {
            "name": "Wave Network Inspector",
            "description": "Network wave analysis and packet inspection tool for traffic monitoring.",
            "executable": "wave.exe",
            "category": "Vulnerability",
            "platform": "Cross-platform",
            "risk_level": "low"
        },
        {
            "name": "WExploit Framework",
            "description": "Windows exploit development framework for advanced penetration testing.",
            "executable": "wexploit.exe",
            "category": "Vulnerability",
            "platform": "Windows",
            "risk_level": "very_high"
        },
        {
            "name": "Swift Malware Analyzer",
            "description": "Advanced malware analysis and detection system with behavioral analysis.",
            "executable": "swift.exe",
            "category": "Attack",
            "platform": "Windows",
            "risk_level": "high"
        },
        {
            "name": "Bunni Virus Scanner",
            "description": "Comprehensive virus detection and analysis tool for malware research.",
            "executable": "bunni.exe",
            "category": "Attack",
            "platform": "Windows",
            "risk_level": "medium"
        },
        {
            "name": "Velocity Network Tool",
            "description": "High-speed network analysis tool for performance and security testing.",
            "executable": "velocity.exe",
            "category": "Attack",
            "platform": "Cross-platform",
            "risk_level": "medium"
        },
        {
            "name": "Claude AI Security",
            "description": "AI-assisted security analysis tool for intelligent threat detection.",
            "executable": "claude.exe",
            "category": "Attack",
            "platform": "Cross-platform",
            "risk_level": "low"
        },
        {
            "name": "Delta Mobile",
            "description": "Mobile delta interpolation tool for mobile application security testing.",
            "executable": "deltainterpolation.app",
            "category": "Mobile",
            "platform": "Mobile",
            "risk_level": "medium"
        },
        {
            "name": "GGML Mobile Framework",
            "description": "Comprehensive mobile security testing framework for mobile applications.",
            "executable": "centios.lol",
            "category": "Mobile",
            "platform": "Mobile",
            "risk_level": "medium"
        },
        {
            "name": "Lime Web Platform",
            "description": "Web-based security testing platform with comprehensive web application testing.",
            "executable": "limelink.net",
            "category": "Mobile",
            "platform": "Web",
            "risk_level": "medium"
        },
        {
            "name": "Hydrogen Web Analyzer",
            "description": "Advanced web-based network analysis tool for web security assessment.",
            "executable": "hydrogen.com",
            "category": "Mobile",
            "platform": "Web",
            "risk_level": "low"
        }
    ];
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation to cards
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, index) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('search');
    const chips = document.querySelectorAll('.chip[data-filter]');
    const clearBtn = document.getElementById('clear');

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Filter chips
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            handleFilter(this.dataset.filter);
            
            // Update chip states
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Clear filters
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        chips.forEach(c => c.classList.remove('active'));
        filteredTools = [...toolsData];
        renderAllTools();
    });
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredTools = [...toolsData];
    } else {
        filteredTools = toolsData.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm) ||
            tool.executable.toLowerCase().includes(searchTerm) ||
            tool.category.toLowerCase().includes(searchTerm) ||
            tool.platform.toLowerCase().includes(searchTerm)
        );
    }
    
    renderAllTools();
}

// Handle filter
function handleFilter(filterType) {
    if (filterType === 'High Risk') {
        filteredTools = toolsData.filter(tool => 
            tool.risk_level === 'high' || tool.risk_level === 'very_high'
        );
    } else {
        filteredTools = toolsData.filter(tool => 
            tool.category.includes(filterType) || 
            tool.platform.includes(filterType)
        );
    }
    
    renderAllTools();
}

// Render all tools
function renderAllTools() {
    const sections = {
        'Core': document.querySelector('[data-section="Core"]'),
        'Vulnerability': document.querySelector('[data-section="Vulnerability"]'),
        'Attack': document.querySelector('[data-section="Attack"]'),
        'Mobile': document.querySelector('[data-section="Mobile"]')
    };

    // Clear all sections
    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = '';
    });

    // Group tools by category
    const groupedTools = {
        'Core': [],
        'Vulnerability': [],
        'Attack': [],
        'Mobile': []
    };

    filteredTools.forEach(tool => {
        const category = tool.category;
        if (groupedTools[category]) {
            groupedTools[category].push(tool);
        }
    });

    // Render each category
    Object.keys(groupedTools).forEach(category => {
        const section = sections[category];
        if (section && groupedTools[category].length > 0) {
            groupedTools[category].forEach(tool => {
                const card = createToolCard(tool);
                section.appendChild(card);
            });
        }
    });

    // Re-setup animations for new cards
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
}

// Create tool card
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'card reveal';
    
    const riskClass = getRiskClass(tool.risk_level);
    const categoryClass = tool.category.toLowerCase();
    
    card.innerHTML = `
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <div class="executable">${tool.executable}</div>
        <div class="badges">
            <span class="badge platform">${tool.platform}</span>
            <span class="badge ${categoryClass}">${tool.category}</span>
            <span class="badge ${riskClass}">${formatRiskLevel(tool.risk_level)}</span>
        </div>
        <a href="#" class="button" onclick="showToolDetails('${tool.name}')">Details anzeigen</a>
    `;
    
    return card;
}

// Get risk class for styling
function getRiskClass(riskLevel) {
    switch(riskLevel) {
        case 'very_high':
        case 'high':
            return 'high-risk';
        case 'medium':
            return 'medium-risk';
        case 'low':
            return 'low-risk';
        default:
            return 'medium-risk';
    }
}

// Format risk level for display
function formatRiskLevel(riskLevel) {
    switch(riskLevel) {
        case 'very_high':
            return 'SEHR HOCH';
        case 'high':
            return 'HOCH';
        case 'medium':
            return 'MITTEL';
        case 'low':
            return 'NIEDRIG';
        default:
            return 'UNBEKANNT';
    }
}

// Show tool details (modal or alert)
function showToolDetails(toolName) {
    const tool = toolsData.find(t => t.name === toolName);
    if (!tool) return;
    
    const riskWarning = tool.risk_level === 'high' || tool.risk_level === 'very_high' 
        ? '\n\n⚠️ WARNUNG: Dieses Tool hat ein hohes Risiko und sollte nur von autorisierten Sicherheitsexperten verwendet werden!' 
        : '';
    
    const details = `
🔧 ${tool.name}

📝 Beschreibung:
${tool.description}

💻 Executable: ${tool.executable}
🏷️ Kategorie: ${tool.category}
🖥️ Plattform: ${tool.platform}
⚠️ Risikostufe: ${formatRiskLevel(tool.risk_level)}${riskWarning}

═══════════════════════════════════════
⚠️ WICHTIGER HINWEIS:
Dieses Tool darf nur für autorisierte Sicherheitstests und zu Bildungszwecken verwendet werden. Missbrauch ist strafbar!
    `;
    
    alert(details);
}

// Add loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(6, 11, 20, 0.9); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            z-index: 9999;
        ">
            <div style="color: var(--accent); font-size: 18px;">
                <div style="
                    width: 40px; 
                    height: 40px; 
                    border: 3px solid transparent; 
                    border-top: 3px solid var(--accent); 
                    border-radius: 50%; 
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                "></div>
                Tools werden geladen...
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

// Enhanced scroll reveal with stagger effect
function enhancedScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger effect
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Add smooth hover effects for cards
function addCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    
    setTimeout(() => {
        loadToolsData().then(() => {
            hideLoading();
            setupScrollAnimations();
            setupEventListeners();
            setupSmoothScrolling();
            enhancedScrollReveal();
            addCardInteractions();
        });
    }, 800); // Simulate loading time
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('search');
        if (searchInput === document.activeElement) {
            searchInput.blur();
        }
        if (searchInput.value) {
            searchInput.value = '';
            handleSearch({ target: { value: '' } });
        }
    }
});

// Add search suggestions
function addSearchSuggestions() {
    const searchInput = document.getElementById('search');
    const suggestions = ['kernel', 'sql', 'network', 'mobile', 'exploit', 'vulnerability'];
    
    searchInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = `Versuche: ${suggestions[Math.floor(Math.random() * suggestions.length)]}...`;
        }
    });
    
    searchInput.addEventListener('blur', function() {
        this.placeholder = 'Suche nach Name, Plattform, Kategorie …';
    });
}

// Add copy functionality for executables
function addCopyFunctionality() {
    document.querySelectorAll('.executable').forEach(exec => {
        exec.style.cursor = 'pointer';
        exec.title = 'Klicken zum Kopieren';
        
        exec.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                const original = this.textContent;
                this.textContent = '✓ Kopiert!';
                this.style.color = 'var(--ok)';
                
                setTimeout(() => {
                    this.textContent = original;
                    this.style.color = 'var(--accent)';
                }, 1000);
            });
        });
    });
}

// Update the renderAllTools function to include new interactions
const originalRenderAllTools = renderAllTools;
renderAllTools = function() {
    originalRenderAllTools.call(this);
    setTimeout(() => {
        addCardInteractions();
        addCopyFunctionality();
    }, 100);
};
