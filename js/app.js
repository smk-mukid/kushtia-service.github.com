// DOM Elements
const headerUserPhone = document.getElementById('headerUserPhone');
const serviceGrid = document.getElementById('serviceGrid');
const searchInput = document.getElementById('searchInput');
const loginModal = document.getElementById('loginModal');
const headerLoginBtn = document.getElementById('headerLoginBtn');
const modalLoginBtn = document.getElementById('modalLoginBtn');
const registerBtn = document.getElementById('registerBtn');
const forgotPassword = document.getElementById('forgotPassword');
const profileSection = document.getElementById('profileSection');
const logoutBtn = document.getElementById('logoutBtn');
const registerModal = document.getElementById('registerModal');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const showLoginBtn = document.getElementById('showLoginBtn');

// User state
let isLoggedIn = false;
let currentUser = null;

// Check for saved login state on page load
function initializeUserState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        updateUserState(JSON.parse(savedUser));
    }
}

// Render service buttons
function renderServices(services) {
    serviceGrid.innerHTML = '';
    services.forEach(service => {
        const button = document.createElement('div');
        button.className = 'bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors text-center';
        button.innerHTML = `
            <div class="text-2xl mb-2">${service.icon}</div>
            <div class="text-sm">${service.name}</div>
        `;
        button.onclick = () => handleServiceClick(service);
        serviceGrid.appendChild(button);
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredServices = serviceData.filter(service => 
        service.name.toLowerCase().includes(searchTerm)
    );
    renderServices(filteredServices);
});

// Handle service button clicks
function handleServiceClick(service) {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }
    // Redirect to appropriate service page
    switch(service.id) {
        case 1: // Doctors
            window.location.href = 'service-detail.html';
            break;
        case 2: // Hospitals
            window.location.href = 'hospital-list.html';
            break;
        case 3: // Ambulance
            window.location.href = 'ambulance-list.html';
            break;
        case 4: // Train Schedule
            window.location.href = 'train-time.html';
            break;
        case 5: // Tourist Spots
            window.location.href = 'tourist-spots.html';
            break;
        case 6: // House Rental
            window.location.href = 'house-rent.html';
            break;
        case 7: // Shopping
            window.location.href = 'shopping.html';
            break;
        case 8: // Fire Service
            window.location.href = 'fire-service.html';
            break;
        case 20: // Blood Bank
            window.location.href = 'blood-bank-list.html';
            break;
        case 10: // Thana-Police
            window.location.href = 'thana-police.html';
            break;
            case 9: // Courier Service
            window.location.href = 'courier-service.html';
            break;
            case 12: // Electricity Office
            window.location.href = 'electricity-office.html';
            break;
            case 17: //Emargency Service
            window.location.href = 'emargency-service.html';
            break;
            case 13: // Diagnostic Service
            window.location.href = 'diagnostic-service.html';
            break;
            case 11: //website
            window.location.href = 'website.html';
            break;
            case 22: //website
            window.location.href = 'buy-code.html';
            break;
        default:
            console.log('Service page not implemented yet');
    }
}

// Login Modal
function showLoginModal() {
    hideRegisterModal();
    loginModal.classList.remove('hidden');
}

function hideLoginModal() {
    loginModal.classList.add('hidden');
}

// Login functionality
headerLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
});

modalLoginBtn.addEventListener('click', () => {
    const phone = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    
    if (phone && password) {
        updateUserState({ 
            phone,
            loginTime: new Date().toISOString()
        });
        hideLoginModal();
    } else {
        // Highlight empty fields
        if (!phone) document.getElementById('phoneNumber').classList.add('border-red-500');
        if (!password) document.getElementById('password').classList.add('border-red-500');
    }
});

// Remove red border on input
document.getElementById('phoneNumber').addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

document.getElementById('password').addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

// Register functionality
registerBtn.addEventListener('click', () => {
    const phone = document.getElementById('regPhoneNumber').value;
    const password = document.getElementById('regPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if (!phone || !password || !confirmPass) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPass) {
        alert('Passwords do not match');
        return;
    }
    
    updateUserState({ 
        phone,
        loginTime: new Date().toISOString()
    });
    hideRegisterModal();
    alert('Successfully registered!');
});

// Forgot password functionality
forgotPassword.addEventListener('click', () => {
    // Add your forgot password logic here
    alert('Forgot password functionality to be implemented');
});

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === loginModal || event.target === registerModal) {
        hideLoginModal();
        hideRegisterModal();
    }
};

// Modal management
function hideRegisterModal() {
    registerModal.classList.add('hidden');
}

function showRegisterModal() {
    hideLoginModal();
    registerModal.classList.remove('hidden');
}

// Update user state management
function updateUserState(user) {
    isLoggedIn = !!user;
    currentUser = user;
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
    
    if (isLoggedIn) {
        headerUserPhone.textContent = user.phone;
        headerLoginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        headerUserPhone.textContent = 'Guest';
        headerLoginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

// Add new event listeners
showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterModal();
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
});

logoutBtn.addEventListener('click', () => {
    updateUserState(null);
});

// Initial render
renderServices(serviceData); 

// Initialize user state
initializeUserState(); 

// Handle escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideLoginModal();
        hideRegisterModal();
    }
}); 
