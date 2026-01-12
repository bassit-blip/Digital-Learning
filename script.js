// Configuration API
const API_BASE = 'http://localhost:5000/api';

// Service API
const apiService = {
    async getCourses(category = null) {
        try {
            const url = category ? `${API_BASE}/courses?category=${category}` : `${API_BASE}/courses`;
            const response = await fetch(url);
            const data = await response.json();
            return data.courses || [];
        } catch (error) {
            console.log('API non disponible, utilisation des données locales');
            return [];
        }
    },

    async createCourse(courseData) {
        try {
            const response = await fetch(`${API_BASE}/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData)
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async updateCourse(courseId, courseData) {
        try {
            const response = await fetch(`${API_BASE}/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData)
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async deleteCourse(courseId) {
        try {
            const response = await fetch(`${API_BASE}/courses/${courseId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async register(userData) {
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async enroll(courseId) {
        if (!currentUser) throw new Error('Utilisateur non connecté');
        
        try {
            const response = await fetch(`${API_BASE}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    course_id: courseId
                })
            });
            return await response.json();
        } catch (error) {
            throw new Error('API non disponible');
        }
    },

    async getUserCourses(userId) {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/courses`);
            const data = await response.json();
            return data.courses || [];
        } catch (error) {
            console.error('Erreur cours utilisateur:', error);
            return [];
        }
    },

    async getStats() {
        try {
            const response = await fetch(`${API_BASE}/stats`);
            return await response.json();
        } catch (error) {
            console.error('Erreur stats:', error);
            return {
                total_courses: 150,
                total_students: 10000,
                total_instructors: 50,
                satisfaction_rate: 98
            };
        }
    }
};

// Données de cours par défaut (fallback)
let courses = [
    {
        id: 1,
        title: "Introduction au Machine Learning",
        instructor: "Dr. Sarah Chen",
        rating: 4.8,
        students: 1250,
        category: "ai",
        icon: "fas fa-robot",
        description: "Apprenez les bases du machine learning avec Python et scikit-learn.",
        color: "ai"
    },
    {
        id: 2,
        title: "Deep Learning avec TensorFlow",
        instructor: "Prof. Marco Silva",
        rating: 4.9,
        students: 890,
        category: "ai",
        icon: "fas fa-brain",
        description: "Maîtrisez les réseaux de neurones profonds avec TensorFlow et Keras.",
        color: "ai"
    },
    {
        id: 3,
        title: "Développement Web Full Stack",
        instructor: "Alexandre Martin",
        rating: 4.7,
        students: 2100,
        category: "dev",
        icon: "fas fa-code",
        description: "Devenez développeur full stack avec React, Node.js et MongoDB.",
        color: "dev"
    },
    {
        id: 4,
        title: "Data Science avec Python",
        instructor: "Dr. Anna Kowalski",
        rating: 4.7,
        students: 1520,
        category: "data",
        icon: "fas fa-chart-line",
        description: "Maîtrisez l'analyse de données avec Pandas, NumPy et Matplotlib.",
        color: "data"
    },
    {
        id: 5,
        title: "Cybersécurité Fondamentale",
        instructor: "Capt. Jean Dupont",
        rating: 4.6,
        students: 920,
        category: "cyber",
        icon: "fas fa-shield-alt",
        description: "Apprenez les bases de la cybersécurité et les techniques de protection.",
        color: "cyber"
    },
    {
        id: 6,
        title: "DevOps et Cloud AWS",
        instructor: "Michel Bernard",
        rating: 4.8,
        students: 1100,
        category: "dev",
        icon: "fas fa-network-wired",
        description: "Maîtrisez DevOps avec Docker, Kubernetes et AWS.",
        color: "dev"
    }
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const userMenu = document.getElementById('user-menu');
const goToLogin = document.getElementById('go-to-login');
const goToRegister = document.getElementById('go-to-register');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Admin Elements
const addCourseBtn = document.getElementById('add-course-btn');
const courseForm = document.getElementById('course-form');
const saveCourseBtn = document.getElementById('save-course-btn');
const cancelCourseBtn = document.getElementById('cancel-course-btn');
const adminCoursesList = document.getElementById('admin-courses-list');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const closeDeleteModal = document.getElementById('close-delete-modal');

// Form Elements
const courseTitle = document.getElementById('course-title');
const courseInstructor = document.getElementById('course-instructor');
const courseCategory = document.getElementById('course-category');
const courseRating = document.getElementById('course-rating');
const courseStudents = document.getElementById('course-students');
const courseIcon = document.getElementById('course-icon');
const courseDescription = document.getElementById('course-description');

// Current user state
let currentUser = null;
let currentCourseId = null;
let courseToDelete = null;

// Initialize the application
async function init() {
    // Try to load courses from API
    await loadCoursesFromAPI();
    
    // Load stats from API
    await updateStats();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Check for saved user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserMenu();
    }
    
    console.log('✅ Frontend initialisé');
}

// Charger les cours depuis l'API
async function loadCoursesFromAPI() {
    try {
        const apiCourses = await apiService.getCourses();
        if (apiCourses.length > 0) {
            courses = apiCourses;
            console.log('✅ Cours chargés depuis l\'API');
        } else {
            console.log('ℹ️ Utilisation des cours locaux');
        }
    } catch (error) {
        console.log('ℹ️ API non disponible, utilisation des cours locaux');
    }
    renderCourses();
    renderAdminCourses();
}

// Update stats from API
async function updateStats() {
    try {
        const stats = await apiService.getStats();
        
        // Mettre à jour les éléments de statistiques si ils existent
        const statElements = document.querySelectorAll('.stat-value');
        if (statElements.length >= 4) {
            statElements[0].textContent = `${stats.total_students}+`;
            statElements[1].textContent = `${stats.total_courses}+`;
            statElements[2].textContent = `${stats.total_instructors}+`;
            statElements[3].textContent = `${stats.satisfaction_rate}%`;
        }
    } catch (error) {
        console.log('Utilisation des statistiques par défaut');
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
    
    // Footer links
    document.querySelectorAll('.footer-links a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Auth buttons
    loginBtn.addEventListener('click', () => showPage('login'));
    registerBtn.addEventListener('click', () => showPage('register'));
    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
    });
    goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register');
    });
    
    // Chat functionality
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Form submissions
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    
    // Admin functionality
    if (addCourseBtn) addCourseBtn.addEventListener('click', showCourseForm);
    if (cancelCourseBtn) cancelCourseBtn.addEventListener('click', hideCourseForm);
    if (courseForm) courseForm.addEventListener('submit', handleCourseSubmit);
    
    // Delete modal
    if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', confirmDelete);
    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', hideDeleteModal);
    if (closeDeleteModal) closeDeleteModal.addEventListener('click', hideDeleteModal);

    // Delegation d'événements pour les boutons dynamiques
    document.addEventListener('click', function(e) {
        // Gérer les clics sur les boutons de modification
        if (e.target.closest('.edit-course')) {
            const button = e.target.closest('.edit-course');
            const courseId = parseInt(button.getAttribute('data-id'));
            editCourse(courseId);
        }
        
        // Gérer les clics sur les boutons de suppression
        if (e.target.closest('.delete-course')) {
            const button = e.target.closest('.delete-course');
            const courseId = parseInt(button.getAttribute('data-id'));
            showDeleteModal(courseId);
        }
    });
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// Show specific page and hide others
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // If showing auth pages, update user menu
    if (pageId === 'login' || pageId === 'register') {
        userMenu.style.display = 'none';
    } else if (currentUser) {
        updateUserMenu();
    } else {
        userMenu.style.display = 'flex';
    }
    
    // If showing admin page, refresh courses list
    if (pageId === 'admin') {
        renderAdminCourses();
    }
}

// Filter courses by category
async function filterCourses(category) {
    showPage('courses');
    try {
        const filteredCourses = await apiService.getCourses(category);
        renderFilteredCourses(filteredCourses);
    } catch (error) {
        // Fallback aux cours locaux si l'API échoue
        const localFiltered = courses.filter(course => course.category === category);
        renderFilteredCourses(localFiltered);
    }
}

// Render filtered courses
function renderFilteredCourses(filteredCourses) {
    const allCoursesContainer = document.getElementById('all-courses');
    if (!allCoursesContainer) return;
    
    allCoursesContainer.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        allCoursesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Aucun cours trouvé dans cette catégorie.</p>';
        return;
    }
    
    filteredCourses.forEach(course => {
        allCoursesContainer.appendChild(createCourseCard(course));
    });
}

// Render courses to the page
async function renderCourses() {
    const allCoursesContainer = document.getElementById('all-courses');
    const myCoursesContainer = document.getElementById('my-courses');
    
    // Clear existing content
    if (allCoursesContainer) {
        allCoursesContainer.innerHTML = '';
        // Render all courses
        courses.forEach(course => {
            allCoursesContainer.appendChild(createCourseCard(course));
        });
    }
    
    if (myCoursesContainer && currentUser) {
        myCoursesContainer.innerHTML = '';
        try {
            // Charger les cours de l'utilisateur depuis l'API
            const userCourses = await apiService.getUserCourses(currentUser.id);
            if (userCourses.length > 0) {
                userCourses.forEach(course => {
                    myCoursesContainer.appendChild(createCourseCard(course));
                });
            } else {
                myCoursesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Aucun cours suivi pour le moment.</p>';
            }
        } catch (error) {
            myCoursesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Erreur de chargement des cours.</p>';
        }
    } else if (myCoursesContainer) {
        myCoursesContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Connectez-vous pour voir vos cours.</p>';
    }
}

// Render admin courses table
function renderAdminCourses() {
    if (!adminCoursesList) return;
    
    adminCoursesList.innerHTML = '';
    
    // Filter courses for admin (demo: show all)
    const adminCourses = courses;
    
    if (adminCourses.length === 0) {
        adminCoursesList.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-light); padding: 20px;">Aucun cours publié</td></tr>';
        return;
    }
    
    adminCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.title}</td>
            <td><span class="course-category ${course.color}">${getCategoryName(course.category)}</span></td>
            <td>${course.students}</td>
            <td>${course.rating} ⭐</td>
            <td><span style="color: var(--success);">●</span> Publié</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm edit-course" data-id="${course.id}">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-danger btn-sm delete-course" data-id="${course.id}">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </td>
        `;
        adminCoursesList.appendChild(row);
    });
}

// Get category name from code
function getCategoryName(categoryCode) {
    const categories = {
        'ai': 'IA',
        'dev': 'Dev',
        'data': 'Data',
        'cyber': 'Cyber'
    };
    return categories[categoryCode] || categoryCode;
}

// Create a course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    // Get gradient based on category
    const gradients = {
        'ai': 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
        'dev': 'linear-gradient(135deg, #06b6d4, #22d3ee)',
        'data': 'linear-gradient(135deg, #10b981, #34d399)',
        'cyber': 'linear-gradient(135deg, #f59e0b, #fbbf24)'
    };
    
    card.innerHTML = `
        <div class="course-image" style="background: ${gradients[course.category] || gradients.ai}">
            <i class="${course.icon}"></i>
        </div>
        <div class="course-content">
            <span class="course-category ${course.color}">${getCategoryName(course.category)}</span>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">Par ${course.instructor}</p>
            <div class="course-meta">
                <div class="course-rating">
                    <i class="fas fa-star"></i> ${course.rating}
                </div>
                <div class="course-students">
                    ${course.students} étudiants
                </div>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="enrollInCourse(${course.id})">Commencer le cours</button>
        </div>
    `;
    return card;
}

// Enroll in course
async function enrollInCourse(courseId) {
    if (!currentUser) {
        showPage('login');
        return;
    }
    
    try {
        const result = await apiService.enroll(courseId);
        
        if (result.error) {
            alert(`Erreur: ${result.error}`);
            return;
        }
        
        alert(`✅ Inscription au cours réussie !`);
        
        // Mettre à jour l'affichage
        await renderCourses();
    } catch (error) {
        // Fallback local - juste un message de succès
        alert(`✅ Inscription au cours réussie (mode local) !`);
    }
}

// Show course form for adding new course
function showCourseForm() {
    if (!courseForm || !addCourseBtn) return;
    
    courseForm.style.display = 'block';
    addCourseBtn.style.display = 'none';
    resetCourseForm();
    currentCourseId = null;
}

// Hide course form
function hideCourseForm() {
    if (!courseForm || !addCourseBtn) return;
    
    courseForm.style.display = 'none';
    addCourseBtn.style.display = 'block';
    resetCourseForm();
    currentCourseId = null;
}

// Reset course form
function resetCourseForm() {
    if (!courseTitle || !courseInstructor || !courseCategory || !courseRating || !courseStudents || !courseIcon || !courseDescription) return;
    
    courseTitle.value = '';
    courseInstructor.value = '';
    courseCategory.value = '';
    courseRating.value = '';
    courseStudents.value = '';
    courseIcon.value = 'fas fa-robot';
    courseDescription.value = '';
}

// Handle course form submission
function handleCourseSubmit(e) {
    e.preventDefault();
    
    const courseData = {
        title: courseTitle.value,
        instructor: courseInstructor.value,
        category: courseCategory.value,
        rating: parseFloat(courseRating.value),
        students: parseInt(courseStudents.value),
        icon: courseIcon.value,
        description: courseDescription.value,
        color: courseCategory.value
    };
    
    if (currentCourseId) {
        // Update existing course
        updateCourse(currentCourseId, courseData);
    } else {
        // Add new course
        addCourse(courseData);
    }
    
    hideCourseForm();
}

// Add new course
async function addCourse(courseData) {
    try {
        const result = await apiService.createCourse(courseData);
        
        if (result.error) {
            alert(`Erreur: ${result.error}`);
            return;
        }
        
        // Ajouter le nouveau cours à la liste locale
        courses.unshift(result.course);
        renderCourses();
        renderAdminCourses();
        
        alert('✅ Cours publié avec succès sur le serveur !');
    } catch (error) {
        // Fallback local
        const newCourse = {
            id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
            ...courseData
        };
        
        courses.unshift(newCourse);
        renderCourses();
        renderAdminCourses();
        
        alert('✅ Cours publié en local (API non disponible) !');
    }
}

// Edit course
function editCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        courseTitle.value = course.title;
        courseInstructor.value = course.instructor;
        courseCategory.value = course.category;
        courseRating.value = course.rating;
        courseStudents.value = course.students;
        courseIcon.value = course.icon;
        courseDescription.value = course.description || '';
        
        currentCourseId = courseId;
        courseForm.style.display = 'block';
        addCourseBtn.style.display = 'none';
    }
}

// Update course
async function updateCourse(courseId, courseData) {
    try {
        const result = await apiService.updateCourse(courseId, courseData);
        
        if (result.error) {
            alert(`Erreur: ${result.error}`);
            return;
        }
        
        // Mettre à jour le cours dans la liste locale
        const courseIndex = courses.findIndex(c => c.id === courseId);
        if (courseIndex !== -1) {
            courses[courseIndex] = result.course;
        }
        
        renderCourses();
        renderAdminCourses();
        alert('✅ Cours modifié avec succès !');
    } catch (error) {
        // Fallback local
        const courseIndex = courses.findIndex(c => c.id === courseId);
        if (courseIndex !== -1) {
            courses[courseIndex] = { ...courses[courseIndex], ...courseData };
            renderCourses();
            renderAdminCourses();
            alert('✅ Cours modifié en local !');
        }
    }
}

// Show delete confirmation modal
function showDeleteModal(courseId) {
    courseToDelete = courseId;
    deleteModal.classList.add('active');
    
    // Ajouter un overlay pour empêcher les clics en arrière-plan
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '999';
    overlay.id = 'modal-overlay';
    overlay.addEventListener('click', hideDeleteModal);
    document.body.appendChild(overlay);
}

// Hide delete confirmation modal
function hideDeleteModal() {
    deleteModal.classList.remove('active');
    courseToDelete = null;
    
    // Supprimer l'overlay
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Confirm course deletion
async function confirmDelete() {
    if (courseToDelete) {
        try {
            const result = await apiService.deleteCourse(courseToDelete);
            
            if (result.error) {
                alert(`Erreur: ${result.error}`);
                return;
            }
            
            // Supprimer le cours de la liste locale
            courses = courses.filter(c => c.id !== courseToDelete);
            renderCourses();
            renderAdminCourses();
            hideDeleteModal();
            alert('✅ Cours supprimé avec succès !');
        } catch (error) {
            // Fallback local
            courses = courses.filter(c => c.id !== courseToDelete);
            renderCourses();
            renderAdminCourses();
            hideDeleteModal();
            alert('✅ Cours supprimé en local !');
        }
    }
}

// Toggle chat window
function toggleChat() {
    chatContainer.classList.toggle('active');
}

// Send a chat message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-sender">Vous</div>
        ${message}
    `;
    
    // Add to chat
    chatMessages.appendChild(messageElement);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response after a delay
    setTimeout(() => {
        const responses = [
            "Excellent choix ! Ce cours couvre exactement ce sujet. Souhaitez-vous que je vous en dise plus ?",
            "Je vous recommande de consulter aussi notre cours sur les fondamentaux pour bien débuter.",
            "Bon choix ! N'hésitez pas à poser vos questions dans le forum du cours.",
            "Ce cours est très populaire parmi nos étudiants. Vous faites le bon choix !"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseElement = document.createElement('div');
        responseElement.className = 'message received';
        responseElement.innerHTML = `
            <div class="message-sender">Assistant</div>
            ${randomResponse}
        `;
        
        chatMessages.appendChild(responseElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const result = await apiService.login(email, password);
        
        if (result.error) {
            alert(`Erreur: ${result.error}`);
            return;
        }
        
        currentUser = result.user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        updateUserMenu();
        showPage('dashboard');
        
        // Recharger les cours pour afficher ceux de l'utilisateur
        await renderCourses();
        
        alert('✅ Connexion réussie ! Bienvenue sur Digital Learning.');
    } catch (error) {
        // Fallback à l'authentification locale
        if (email && password) {
            currentUser = {
                name: email.split('@')[0],
                email: email,
                avatar: email.charAt(0).toUpperCase(),
                id: Date.now() // ID temporaire
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserMenu();
            showPage('dashboard');
            alert('✅ Connexion réussie (mode local) !');
        } else {
            alert('❌ Erreur de connexion. Vérifiez vos identifiants.');
        }
    }
}

// Handle register form submission
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }
    
    try {
        const result = await apiService.register({ name, email, password });
        
        if (result.error) {
            alert(`Erreur: ${result.error}`);
            return;
        }
        
        currentUser = result.user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        updateUserMenu();
        showPage('dashboard');
        
        alert('✅ Inscription réussie ! Bienvenue sur Digital Learning.');
    } catch (error) {
        // Fallback local
        if (name && email && password) {
            currentUser = {
                name: name,
                email: email,
                avatar: name.charAt(0).toUpperCase(),
                id: Date.now()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserMenu();
            showPage('dashboard');
            alert('✅ Inscription réussie (mode local) !');
        } else {
            alert('❌ Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    }
}

// Update user menu after login
function updateUserMenu() {
    if (currentUser) {
        userMenu.innerHTML = `
            <div class="user-avatar">${currentUser.avatar}</div>
            <span>${currentUser.name}</span>
            <button class="btn btn-outline" id="logout-btn">Déconnexion</button>
        `;
        
        // Add logout event listener
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    }
}

// Handle user logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    userMenu.innerHTML = `
        <button class="btn btn-outline" id="login-btn">Connexion</button>
        <button class="btn btn-primary" id="register-btn">S'inscrire</button>
    `;
    
    // Reattach event listeners to new buttons
    document.getElementById('login-btn').addEventListener('click', () => showPage('login'));
    document.getElementById('register-btn').addEventListener('click', () => showPage('register'));
    
    showPage('home');
    
    // Recharger les cours (pour enlever les cours personnels)
    renderCourses();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);