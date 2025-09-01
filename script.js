// Navigation between pages
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                const pageId = this.getAttribute('data-page');
                
                // Hide all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show the selected page
                document.getElementById(pageId).classList.add('active');
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // If it's a nav link, set it to active
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
                
                // If dashboard page is selected, initialize charts
                if (pageId === 'dashboard') {
                    initCharts();
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });
        
        // Theme switching functionality
        const themeSwitch = document.getElementById('theme-switch');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use OS preference
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        }
        
        // Theme switch event listener
        themeSwitch.addEventListener('change', function() {
            let theme = 'light';
            if (this.checked) {
                theme = 'dark';
            }
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Reinitialize charts to match theme
            if (document.getElementById('dashboard').classList.contains('active')) {
                initCharts();
            }
        });
        
        // Font size adjustment
        const fontSizeSlider = document.getElementById('font-size');
        fontSizeSlider.addEventListener('input', function() {
            document.body.style.fontSize = this.value + 'px';
        });
        
        // Color scheme options
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                // In a real app, this would change the CSS variables for colors
                alert('Color scheme changed to ' + this.getAttribute('data-color'));
            });
        });
        
        // Dashboard charts initialization
        function initCharts() {
            // Income vs Expenses Chart
            const incomeExpenseCtx = document.getElementById('incomeExpenseChart')?.getContext('2d');
            if (!incomeExpenseCtx) return;
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
            const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            const textColor = isDarkMode ? '#DCE6E2' : '#2B2B2B';
            // Destroy existing chart if it exists
            if (window.incomeExpenseChartInstance) {
                window.incomeExpenseChartInstance.destroy();
            }
            window.incomeExpenseChartInstance = new Chart(incomeExpenseCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Income',
                            data: [3200, 3500, 3800, 4000, 4250, 4500],
                            backgroundColor: 'rgba(75, 180, 163, 0.7)',
                            borderColor: 'rgba(75, 180, 163, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Expenses',
                            data: [2800, 3000, 3200, 3100, 2845, 2900],
                            backgroundColor: 'rgba(220, 53, 69, 0.7)',
                            borderColor: 'rgba(220, 53, 69, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: gridColor
                            },
                            ticks: {
                                color: textColor
                            }
                        },
                        x: {
                            grid: {
                                color: gridColor
                            },
                            ticks: {
                                color: textColor
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    }
                }
            });
            
            // Category Spending Chart
            const categoryCtx = document.getElementById('categoryChart')?.getContext('2d');
            if (!categoryCtx) return;
            // Destroy existing chart if it exists
            if (window.categoryChartInstance) {
                window.categoryChartInstance.destroy();
            }
            window.categoryChartInstance = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping'],
                    datasets: [{
                        data: [1200, 450, 180, 150, 120, 210],
                        backgroundColor: [
                            'rgba(0, 122, 142, 0.8)',
                            'rgba(75, 180, 163, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(40, 167, 69, 0.8)',
                            'rgba(111, 66, 193, 0.8)',
                            'rgba(220, 53, 69, 0.8)'
                        ],
                        borderColor: [
                            'rgba(0, 122, 142, 1)',
                            'rgba(75, 180, 163, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(40, 167, 69, 1)',
                            'rgba(111, 66, 193, 1)',
                            'rgba(220, 53, 69, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColor
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize dashboard charts if we're on the dashboard page
        if (document.getElementById('dashboard')) {
            document.addEventListener('DOMContentLoaded', function() {
                initCharts();
            });
        }
        
        // Period filter buttons (dashboard)
        document.querySelectorAll('[data-period]').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('[data-period]').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                // In a real app, this would filter the dashboard data
            });
        });
        
        // Record page specific JavaScript
        if (document.getElementById('record')) {
            document.addEventListener('DOMContentLoaded', function() {
                // Transaction type selection
                const typeButtons = document.querySelectorAll('.type-btn');
                const expenseCategories = document.getElementById('expenseCategories');
                const incomeCategories = document.getElementById('incomeCategories');
                const transferCategories = document.getElementById('transferCategories');
                const categorySelect = document.querySelector('select');
                typeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        typeButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        const type = this.getAttribute('data-type');
                        expenseCategories.style.display = 'none';
                        incomeCategories.style.display = 'none';
                        transferCategories.style.display = 'none';
                        if (type === 'expense') {
                            expenseCategories.style.display = 'block';
                        } else if (type === 'income') {
                            incomeCategories.style.display = 'block';
                        } else if (type === 'transfer') {
                            transferCategories.style.display = 'block';
                        }
                        categorySelect.value = '';
                    });
                });
                // Character count for note textarea
                const noteTextarea = document.querySelector('textarea');
                const charCount = document.querySelector('.char-count');
                if (noteTextarea && charCount) {
                    noteTextarea.addEventListener('input', function() {
                        const length = this.value.length;
                        charCount.textContent = `${length}/200`;
                        if (length > 180) {
                            charCount.style.color = '#dc3545';
                        } else {
                            charCount.style.color = '#4BB4A3';
                        }
                    });
                }
                // Form submission
                const transactionForm = document.getElementById('transactionForm');
                if (transactionForm) {
                    transactionForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const amount = this.querySelector('input[type="number"]').value;
                        const date = this.querySelector('input[type="date"]').value;
                        const category = this.querySelector('select').value;
                        const description = this.querySelector('input[type="text"]').value;
                        const note = this.querySelector('textarea').value;
                        const paymentMethod = this.querySelectorAll('select')[1]?.value;
                        const isRepeating = this.querySelector('input[type="checkbox"]').checked;
                        const type = document.querySelector('.type-btn.active').getAttribute('data-type');
                        addTransaction({ amount, date, category, description, note, paymentMethod, isRepeating, type });
                        alert(`Transaction added successfully!\nType: ${type}\nAmount: $${amount}\nCategory: ${category}`);
                        this.reset();
                        const charCount = document.querySelector('.char-count');
                        if (charCount) charCount.textContent = '0/200';
                    });
                }
                // Set today's date as default for date field
                const dateField = document.querySelector('input[type="date"]');
                if (dateField && !dateField.value) {
                    const today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
                    const formattedToday = `${yyyy}-${mm}-${dd}`;
                    dateField.value = formattedToday;
                }
            });
        }
        
        // Transaction data structure and state management
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Add a new transaction from the record page form
        function addTransaction(transaction) {
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            updateRecentTransactions();
            updateChartsData();
        }

        // Populate the Recent Transactions list
        function updateRecentTransactions() {
            const recentList = document.getElementById('recent-transactions');
            if (!recentList) return;
            recentList.innerHTML = '';
            // Show last 5 transactions
            transactions.slice(-5).reverse().forEach(tx => {
                const item = document.createElement('div');
                item.className = 'expense-item';
                item.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="category-icon">
                            <i class="fas fa-${tx.type === 'income' ? 'money-check text-success' : tx.type === 'expense' ? 'money-bill-wave text-danger' : 'exchange-alt text-info'}"></i>
                        </div>
                        <div>
                            <h6 class="mb-0">${tx.category}</h6>
                            <small class="text-muted">${tx.date}</small>
                        </div>
                    </div>
                    <span class="fw-bold ${tx.type === 'income' ? 'text-success' : 'text-danger'}">${tx.type === 'income' ? '+' : '-'}$${parseFloat(tx.amount).toFixed(2)}</span>
                `;
                recentList.appendChild(item);
            });
        }

        // Calculate chart data
        function getChartData() {
            const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
            const totalExpenses = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
            const categorySpending = {};
            transactions.filter(tx => tx.type === 'expense').forEach(tx => {
                categorySpending[tx.category] = (categorySpending[tx.category] || 0) + parseFloat(tx.amount);
            });
            return { totalIncome, totalExpenses, categorySpending };
        }

        // Update charts with new data
        function updateChartsData() {
            const { totalIncome, totalExpenses, categorySpending } = getChartData();
            // Example: update dashboard stats
            const incomeStat = document.querySelector('.stat-value.income');
            const expenseStat = document.querySelector('.stat-value.expense');
            if (incomeStat) incomeStat.textContent = `$${totalIncome.toFixed(2)}`;
            if (expenseStat) expenseStat.textContent = `$${totalExpenses.toFixed(2)}`;
            // Example: update category chart
            if (window.categoryChartInstance) {
                window.categoryChartInstance.data.datasets[0].data = Object.values(categorySpending);
                window.categoryChartInstance.data.labels = Object.keys(categorySpending);
                window.categoryChartInstance.update();
            }
            // Example: update income/expense chart
            if (window.incomeExpenseChartInstance) {
                window.incomeExpenseChartInstance.data.datasets[0].data = [totalIncome];
                window.incomeExpenseChartInstance.data.datasets[1].data = [totalExpenses];
                window.incomeExpenseChartInstance.update();
            }
        }

        // Hook into record form submission
        if (document.getElementById('transactionForm')) {
            document.getElementById('transactionForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const amount = this.querySelector('input[type="number"]').value;
                const date = this.querySelector('input[type="date"]').value;
                const category = this.querySelector('select').value;
                const description = this.querySelector('input[type="text"]').value;
                const note = this.querySelector('textarea').value;
                const paymentMethod = this.querySelectorAll('select')[1]?.value;
                const isRepeating = this.querySelector('input[type="checkbox"]').checked;
                const type = document.querySelector('.type-btn.active').getAttribute('data-type');
                addTransaction({ amount, date, category, description, note, paymentMethod, isRepeating, type });
                alert(`Transaction added successfully!\nType: ${type}\nAmount: $${amount}\nCategory: ${category}`);
                this.reset();
                const charCount = document.querySelector('.char-count');
                if (charCount) charCount.textContent = '0/200';
            });
        }

        // On page load, update UI from stored transactions
        window.addEventListener('DOMContentLoaded', () => {
            updateRecentTransactions();
            updateChartsData();
        });