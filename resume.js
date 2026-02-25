function createParticles() {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            
            let particlesArray = [];
            let hue = 240;
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2.5 + 0.5;
                    this.speedX = Math.random() * 0.6 - 0.3;
                    this.speedY = Math.random() * 0.6 - 0.3;
                    this.color = `hsl(${hue}, 80%, 70%)`;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            function initParticles() {
                particlesArray = [];
                for (let i = 0; i < 180; i++) {
                    particlesArray.push(new Particle());
                }
            }
            
            function connectParticles() {
                for (let a = 0; a < particlesArray.length; a++) {
                    for (let b = a; b < particlesArray.length; b++) {
                        const dx = particlesArray[a].x - particlesArray[b].x;
                        const dy = particlesArray[a].y - particlesArray[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 130) {
                            ctx.strokeStyle = `rgba(165, 180, 252, ${0.2 - distance / 650})`;
                            ctx.lineWidth = 0.8;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                
                connectParticles();
                requestAnimationFrame(animateParticles);
            }
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });
            
            resizeCanvas();
            initParticles();
            animateParticles();
            
            // Gentle hue shift
            setInterval(() => {
                hue = (hue + 1) % 360;
            }, 120);
        }
        
        // Typing Animation
        function typeWriter() {
            const texts = [
                "Aspiring Front-End Engineer",
                "AI &amp; ML Enthusiast",
                "UI/UX Alchemist",
                "Building the Future"
            ];
            let count = 0;
            let index = 0;
            let currentText = '';
            let letter = '';
            const typedElement = document.getElementById('typed-text');
            
            function type() {
                if (count === texts.length) count = 0;
                
                currentText = texts[count];
                
                letter = currentText.slice(0, ++index);
                
                typedElement.innerHTML = letter;
                
                if (index === currentText.length) {
                    setTimeout(() => {
                        index = 0;
                        count++;
                        deleteText();
                    }, 2200);
                } else {
                    setTimeout(type, 60);
                }
            }
            
            function deleteText() {
                if (letter.length > 0) {
                    letter = letter.slice(0, -1);
                    typedElement.innerHTML = letter;
                    setTimeout(deleteText, 35);
                } else {
                    setTimeout(type, 400);
                }
            }
            
            type();
        }
        
        // Theme Toggle (light/dark) using .light-mode class on body
        function initTheme() {
            const toggle = document.getElementById('theme-toggle');
            const icon = document.getElementById('theme-icon');
            
            // Default to dark if not set
            if (!localStorage.theme) {
                localStorage.theme = 'dark';
            }
            
            function applyTheme() {
                if (localStorage.theme === 'dark') {
                    document.body.classList.remove('light-mode');
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    document.body.classList.add('light-mode');
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
            
            applyTheme();
            
            toggle.addEventListener('click', () => {
                if (localStorage.theme === 'dark') {
                    localStorage.theme = 'light';
                } else {
                    localStorage.theme = 'dark';
                }
                applyTheme();
            });
        }
        
        // Scroll Reveal
        function revealOnScroll() {
            const sections = document.querySelectorAll('section');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: "0px 0px -80px 0px"
            });
            
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(40px)';
                section.style.transition = 'all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)';
                observer.observe(section);
            });
        }
        
        // Mobile Menu
        function initMobileMenu() {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                
                if (!menu.classList.contains('hidden')) {
                    btn.innerHTML = `<i class="fa-solid fa-xmark text-2xl"></i>`;
                } else {
                    btn.innerHTML = `<i class="fa-solid fa-bars text-2xl"></i>`;
                }
            });
            
            // Close on link click
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('hidden');
                    btn.innerHTML = `<i class="fa-solid fa-bars text-2xl"></i>`;
                });
            });
        }
        
        // Fake form submit
        function handleSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.style.transition = 'all 0.4s';
            btn.innerHTML = `MESSAGE SENT <i class="fa-solid fa-check ml-3"></i>`;
            btn.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                e.target.reset();
            }, 2800);
        }
        
        // Skill bars animation trigger
        function animateSkillBars() {
            const bars = document.querySelectorAll('.skill-bar');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.6 });
            
            bars.forEach(bar => observer.observe(bar));
        }
        
        // Initialize everything
        window.onload = function() {
            createParticles();
            typeWriter();
            initTheme();
            revealOnScroll();
            initMobileMenu();
            animateSkillBars();
            
            // Smooth scroll for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        };