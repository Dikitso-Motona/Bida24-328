// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Global Functionality
    // ====================
    
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
        
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', navbar.classList.contains('active'));
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====================
    // Stories Page
    // ====================
    if (document.querySelector('.stories-list')) {
        // Story Filtering
        const storyFilter = document.getElementById('story-type');
        const storySearch = document.getElementById('story-search');
        const storyCards = document.querySelectorAll('.story-card');
        
        if (storyFilter) {
            storyFilter.addEventListener('change', filterStories);
        }
        
        if (storySearch) {
            storySearch.addEventListener('input', filterStories);
        }
        
        function filterStories() {
            const filterValue = storyFilter ? storyFilter.value.toLowerCase() : 'all';
            const searchValue = storySearch ? storySearch.value.toLowerCase() : '';
            
            storyCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const tags = card.getAttribute('data-tags');
                const text = card.textContent.toLowerCase();
                
                const categoryMatch = filterValue === 'all' || category === filterValue;
                const searchMatch = text.includes(searchValue) || tags.includes(searchValue);
                
                if (categoryMatch && searchMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Story Modal
        const storyModal = document.getElementById('story-modal');
        const readMoreBtns = document.querySelectorAll('.read-more');
        const closeModal = document.querySelector('.close-modal');
        
        if (storyModal) {
            // Sample story data - in a real app this would come from a database
            const stories = {
                1: {
                    title: "Lebo's Journey to Freedom",
                    author: "Lebo, 32",
                    location: "Gaborone",
                    content: `<p>After 5 years in an abusive marriage, Lebo found the courage to leave when she discovered our platform. "Reading other women's stories made me realize I wasn't alone," she says.</p>
                    <p>The final straw came when her husband's abuse began affecting their children. "I knew I had to protect them, even if it meant leaving everything behind."</p>
                    <p>With help from our shelter partners, Lebo and her children found safety. She completed vocational training and now runs a small catering business.</p>
                    <p>"Today, I'm proud to say I'm rebuilding my life. I volunteer at the women's shelter that helped me, because I want others to know there is hope."</p>`,
                    image: "images/story1.jpg"
                },
                2: {
                    title: "Thabo: Breaking the Silence",
                    author: "Thabo, 28",
                    location: "Francistown",
                    content: `<p>Male survivors often suffer in silence, and Thabo was no exception. "For years I thought I was the only man this had happened to," he shares.</p>
                    <p>Thabo was sexually abused by a family member from ages 9 to 13. "I buried the pain until it started affecting my relationships and mental health."</p>
                    <p>After finding our men's support group, Thabo began healing. "Meeting other male survivors changed everything. We need to break the stigma that men can't be victims."</p>
                    <p>Now a peer counselor, Thabo helps other men come forward. "Healing is possible when we stop suffering in silence."</p>`,
                    image: "images/story2.jpg"
                },
                3: {
                    title: "The Motsumi Family's Transformation",
                    author: "Motsumi Family",
                    location: "Maun",
                    content: `<p>Three generations of the Motsumi family are breaking cycles of emotional abuse. "We didn't even realize how toxic our family dynamics were," says mother Kelebogile.</p>
                    <p>After daughter Oratile's school referred them to our family counseling program, they began unpacking decades of harmful patterns. "We learned that yelling and put-downs weren't normal."</p>
                    <p>Through weekly sessions, the family developed healthy communication skills. "Now we actually talk through conflicts instead of exploding," says 14-year-old Oratile.</p>
                    <p>"Change is hard but so worth it," adds grandfather Olebile. "I'm proud we're creating a new legacy for our family."</p>`,
                    image: "images/story3.jpg"
                }
            };
            
            readMoreBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const storyId = this.getAttribute('data-story');
                    const story = stories[storyId];
                    
                    if (story) {
                        document.querySelector('.modal-body').innerHTML = `
                            <div class="modal-image">
                                <img src="${story.image}" alt="${story.title}">
                            </div>
                            <div class="modal-text">
                                <h2>${story.title}</h2>
                                <div class="modal-meta">
                                    <span><i class="fas fa-user"></i> ${story.author}</span>
                                    <span><i class="fas fa-map-marker-alt"></i> ${story.location}</span>
                                </div>
                                ${story.content}
                                <div class="modal-actions">
                                    <button class="btn secondary"><i class="fas fa-share"></i> Share This Story</button>
                                    <button class="btn primary"><i class="fas fa-hands-helping"></i> Get Help</button>
                                </div>
                            </div>
                        `;
                        
                        storyModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            closeModal.addEventListener('click', () => {
                storyModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside content
            storyModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Audio Story Recording
        const triggerTestimonial = document.getElementById('trigger-testimonial');
        if (triggerTestimonial) {
            triggerTestimonial.addEventListener('click', function() {
                alert("Audio recording functionality would be implemented here. In a real app, this would use the Web Audio API.");
            });
        }
    }
    
    // ====================
    // Resources Page
    // ====================
    if (document.querySelector('.resource-tabs')) {
        // Tab System
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Update buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Emergency Call Button
        const callButtons = document.querySelectorAll('.btn-call');
        callButtons.forEach(button => {
            button.addEventListener('click', function() {
                const number = this.parentElement.querySelector('.emergency-number').textContent.trim();
                if (confirm(`Call ${number}?`)) {
                    // In a real app, this would use tel: protocol
                    alert(`Connecting to ${number}... (simulated)`);
                }
            });
        });
        
        // Safety Plan Download
        const downloadBtn = document.querySelector('.btn.primary');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert("Safety plan PDF would download here. In a real app, this would link to an actual PDF file.");
            });
        }
        
        // Quiz Modal
        const startQuizBtn = document.querySelector('.start-quiz');
        const quizModal = document.getElementById('quiz-modal');
        
        if (startQuizBtn && quizModal) {
            startQuizBtn.addEventListener('click', function() {
                quizModal.innerHTML = `
                    <div class="quiz-container">
                        <div class="quiz-header">
                            <h2>GBV Knowledge Quiz</h2>
                            <button class="close-quiz"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="quiz-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                            <span class="progress-text">Question 1 of 5</span>
                        </div>
                        <div class="quiz-question">
                            <h3>Which of these is NOT a form of gender-based violence?</h3>
                            <div class="quiz-options">
                                <label>
                                    <input type="radio" name="q1" value="a">
                                    <span>Physical assault</span>
                                </label>
                                <label>
                                    <input type="radio" name="q1" value="b">
                                    <span>Emotional abuse</span>
                                </label>
                                <label>
                                    <input type="radio" name="q1" value="c">
                                    <span>Financial control</span>
                                </label>
                                <label>
                                    <input type="radio" name="q1" value="d">
                                    <span>Mutual disagreement</span>
                                </label>
                            </div>
                        </div>
                        <div class="quiz-navigation">
                            <button class="btn secondary" disabled>Previous</button>
                            <button class="btn primary">Next</button>
                        </div>
                    </div>
                `;
                
                quizModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Close quiz
                quizModal.querySelector('.close-quiz').addEventListener('click', () => {
                    quizModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    }
    
    // ====================
    // Connect Page
    // ====================
    if (document.querySelector('.connect-options')) {
        // Option Tabs
        const optionTabs = document.querySelectorAll('.option-tab');
        const optionContents = document.querySelectorAll('.option-content');
        
        optionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Update tabs
                optionTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update contents
                optionContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Share Method Toggle
        const methodBtns = document.querySelectorAll('.method-btn');
        const shareForm = document.getElementById('story-form');
        const audioRecorder = document.getElementById('audio-recorder');
        
        methodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                methodBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const method = this.getAttribute('data-method');
                
                if (method === 'written') {
                    shareForm.classList.remove('hidden');
                    audioRecorder.classList.add('hidden');
                } else if (method === 'audio') {
                    shareForm.classList.add('hidden');
                    audioRecorder.classList.remove('hidden');
                } else {
                    // Video method
                    shareForm.classList.add('hidden');
                    audioRecorder.classList.add('hidden');
                    alert("Video submission would be implemented here.");
                }
            });
        });
        
        // Word Counter
        const storyTextarea = document.getElementById('story');
        const wordCount = document.querySelector('.word-count');
        
        if (storyTextarea && wordCount) {
            storyTextarea.addEventListener('input', function() {
                const words = this.value.trim().split(/\s+/);
                const count = this.value.trim() === '' ? 0 : words.length;
                wordCount.textContent = `${count}/2000 words`;
                
                if (count > 2000) {
                    wordCount.style.color = 'var(--danger-color)';
                } else {
                    wordCount.style.color = '';
                }
            });
        }
        
        // Form Submission
        if (shareForm) {
            shareForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate word count
                const words = this.story.value.trim().split(/\s+/);
                if (words.length > 2000) {
                    alert("Please keep your story under 2000 words.");
                    return;
                }
                
                // Simulate form submission
                alert("Thank you for sharing your story. Our team will review it and may contact you if we have questions.");
                this.reset();
                wordCount.textContent = "0/2000 words";
            });
        }
        
        // Audio Recorder Simulation
        const startRecord = document.getElementById('start-record');
        const stopRecord = document.getElementById('stop-record');
        const submitAudio = document.getElementById('submit-audio');
        const audioPlayback = document.getElementById('audio-playback');
        const recordingStatus = document.querySelector('.recording-status');
        
        if (startRecord) {
            startRecord.addEventListener('click', function() {
                this.classList.add('hidden');
                recordingStatus.classList.remove('hidden');
                
                // In a real app, this would use the Web Audio API
                setTimeout(() => {
                    stopRecord.click();
                }, 5000); // Auto-stop after 5 seconds for demo
            });
            
            stopRecord.addEventListener('click', function() {
                recordingStatus.classList.add('hidden');
                audioPlayback.classList.remove('hidden');
                submitAudio.classList.remove('hidden');
                
                // Simulate recorded audio
                audioPlayback.src = "path/to/recorded-audio.mp3"; // Would be set from actual recording
            });
            
            submitAudio.addEventListener('click', function() {
                alert("Your audio story has been submitted. Thank you for sharing.");
                audioPlayback.classList.add('hidden');
                submitAudio.classList.add('hidden');
                startRecord.classList.remove('hidden');
            });
        }
    }
    
    // ====================
    // Feedback Page
    // ====================
    if (document.querySelector('.feedback-container')) {
        // Star Rating
        const stars = document.querySelectorAll('.rating-stars input');
        stars.forEach(star => {
            star.addEventListener('change', function() {
                const rating = this.value;
                // You could send this to analytics or display it
            });
        });
        
        // Contact Preference Toggle
        const contactRadios = document.querySelectorAll('input[name="contact-preference"]');
        const contactInfo = document.getElementById('contact-info');
        
        contactRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'yes') {
                    contactInfo.classList.remove('hidden');
                } else {
                    contactInfo.classList.add('hidden');
                }
            });
        });
        
        // Form Submission
        const feedbackForm = document.getElementById('feedback-form');
        const thankYou = document.getElementById('thank-you');
        const newFeedback = document.getElementById('new-feedback');
        
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                this.classList.add('hidden');
                thankYou.classList.remove('hidden');
                
                // Scroll to thank you message
                thankYou.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (newFeedback) {
            newFeedback.addEventListener('click', function() {
                feedbackForm.reset();
                feedbackForm.classList.remove('hidden');
                thankYou.classList.add('hidden');
                contactInfo.classList.add('hidden');
                
                // Reset radio buttons
                document.querySelector('input[name="contact-preference"][value="no"]').checked = true;
                
                // Scroll back to form
                feedbackForm.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Testimonial Slider
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextIndex = currentTestimonial + 1;
                if (nextIndex >= testimonials.length) nextIndex = 0;
                showTestimonial(nextIndex);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevIndex = currentTestimonial - 1;
                if (prevIndex < 0) prevIndex = testimonials.length - 1;
                showTestimonial(prevIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            showTestimonial(nextIndex);
        }, 8000);
    }
    
    // ====================
    // Animations
    // ====================
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.animated');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    animateOnScroll();
    
    // ====================
    // Dark Mode Styles (dynamically added)
    // ====================
    const darkModeStyles = `
        body.dark-mode {
            background-color: #121212;
            color: #e0e0e0;
        }
        
        body.dark-mode header {
            background-color: #1e1e1e;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        
        body.dark-mode .navbar a {
            color: #e0e0e0;
        }
        
        body.dark-mode .story-card,
        body.dark-mode .resource-card,
        body.dark-mode .emergency-card,
        body.dark-mode .feedback-form,
        body.dark-mode .connect-form {
            background-color: #1e1e1e;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        }
        
        body.dark-mode input,
        body.dark-mode textarea,
        body.dark-mode select {
            background-color: #2d2d2d;
            color: #e0e0e0;
            border-color: #444;
        }
        
        body.dark-mode footer {
            background-color: #1a1a1a;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = darkModeStyles;
    document.head.appendChild(styleElement);
});

// Animation trigger on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animated');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fadeIn');
        }
    });
}

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Alternative: Intersection Observer (more modern approach)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animated').forEach(el => {
        observer.observe(el);
    });
}