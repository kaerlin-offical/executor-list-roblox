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
        ? '\n\n⚠️ WARNUNG
