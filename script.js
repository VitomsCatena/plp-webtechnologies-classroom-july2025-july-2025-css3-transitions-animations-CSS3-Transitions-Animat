// Data for different service types (used globally)
        const serviceRates = {
            Residential: 200, // 200 per square foot
            Commercial: 1000   // 1000 per square foot
        };

        // --- Interactive Feature 1: Tabbed Interface Logic ---

        window.changeServiceTab = function(serviceType) {
            const tabs = document.querySelectorAll('.service-tab');
            const contentContainer = document.getElementById('service-content');
            const quoteResult = document.getElementById('quote-result');
            
            // 1. Update Tab Styling (Event Handling)
            tabs.forEach(tab => {
                // Remove active class from all tabs
                tab.classList.remove('tab-active');
                // Check if the current tab matches the requested serviceType
                if (tab.dataset.service === serviceType) {
                    tab.classList.add('tab-active');
                }
            });

            // 2. Clear old content with a transition effect
            contentContainer.classList.remove('opacity-100');
            contentContainer.classList.add('opacity-0');
            
            // 3. Render New Content after a short delay (for transition)
            setTimeout(() => {
                let contentHTML = '';
                
                if (serviceType === 'Residential') {
                    contentHTML = `
                        <h3 class="text-3xl font-bold mb-4 text-gray-800">Residential Cleaning</h3>
                        <p class="text-gray-600 mb-4">Perfect for homes and apartments. Includes dusting, vacuuming, kitchen and bathroom sanitization.</p>
                        <ul class="list-disc list-inside text-gray-600 ml-4">
                            <li>Deep cleaning options available.</li>
                            <li>Weekly, Bi-weekly, or Monthly scheduling.</li>
                        </ul>
                        <p class="mt-4 text-lg font-semibold text-orange-500">Rate: $${serviceRates.Residential.toFixed(2)} per sq ft</p>
                    `;
                } else if (serviceType === 'Commercial') {
                    contentHTML = `
                        <h3 class="text-3xl font-bold mb-4 text-gray-800">Commercial Cleaning</h3>
                        <p class="text-gray-600 mb-4">Reliable service for offices, retail spaces, and small businesses. Focus on high-traffic areas and cleanliness compliance.</p>
                        <ul class="list-disc list-inside text-gray-600 ml-4">
                            <li>Custom nightly or weekend schedules.</li>
                            <li>Eco-friendly supply commitment.</li>
                        </ul>
                        <p class="mt-4 text-lg font-semibold text-orange-500">Rate: $${serviceRates.Commercial.toFixed(2)} per sq ft</p>
                    `;
                }
                
                contentContainer.innerHTML = contentHTML;
                contentContainer.classList.remove('opacity-0');
                contentContainer.classList.add('opacity-100');
            }, 300); // 300ms delay for fade effect

            // 4. Update the quote button text
            document.getElementById('quote-button').textContent = `Get Quote for ${serviceType}`;
            // Clear previous quote result
            quoteResult.classList.add('hidden');
        };

        // --- Scope, Parameters, and Return Values Demonstration ---

        
        window.calculateQuote = function(type, area) {
            // function scope: tempRate is local and not accessible outside
            const tempRate = serviceRates[type]; 
            
            // Early return and input validation
            if (isNaN(area) || area <= 0) {
                return 0; 
            }

            // Return value: passes the result back to the caller
            return area * tempRate;
        };

        /**
         * Event handler for the Quote Button.
         */
        window.handleQuoteRequest = function() {
            const areaInput = document.getElementById('area-input');
            const quoteResult = document.getElementById('quote-result');
            const currentServiceTab = document.querySelector('.service-tab.tab-active');
            
            // Get values from the DOM
            const area = parseFloat(areaInput.value);
            const serviceType = currentServiceTab.dataset.service;

            // Use return value from calculateQuote function
            const finalQuote = calculateQuote(serviceType, area);

            quoteResult.classList.remove('hidden', 'text-red-500', 'text-green-600');
            
            if (finalQuote === 0 || isNaN(area) || area <= 0) {
                quoteResult.textContent = 'Please enter a valid area (Sq Ft) greater than 0.';
                quoteResult.classList.add('text-red-500');
            } else {
                quoteResult.textContent = `Estimated Quote: $${finalQuote.toFixed(2)} for ${serviceType} service.`;
                quoteResult.classList.add('text-green-600');
            }
        };

        // --- Custom Form Validation (Required Assignment Feature) ---


        window.validateBookingForm = function(event) {
            event.preventDefault(); // Stop default HTML form submission

            const name = document.getElementById('client-name').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const feedbackElement = document.getElementById('form-feedback');

            feedbackElement.classList.add('hidden', 'text-red-500', 'text-green-600'); // Reset feedback

            // Custom Validation 1: Check Minimum Name Length
            if (name.length < 3) {
                feedbackElement.textContent = 'Error: Please enter your full name (at least 3 characters).';
                feedbackElement.classList.remove('hidden');
                feedbackElement.classList.add('text-red-500');
                return; // Early exit using return statement
            }

            // Custom Validation 2: Simple Email Format Check (requires @ and .)
            // Note: This uses JS logic, not built-in browser validation.
            if (!email.includes('@') || !email.includes('.')) {
                feedbackElement.textContent = 'Error: Please enter a valid email address format.';
                feedbackElement.classList.remove('hidden');
                feedbackElement.classList.add('text-red-500');
                return; // Early exit using return statement
            }

            // If we reach here, validation passed (Success feedback)
            feedbackElement.textContent = `Thank you, ${name}! Your booking request has been received.`;
            feedbackElement.classList.remove('hidden', 'text-red-500');
            feedbackElement.classList.add('text-green-600');
            
            // Clear the form
            document.getElementById('booking-form').reset();
            
            // Hide message after a few seconds
            setTimeout(() => { feedbackElement.classList.add('hidden'); }, 6000);
        };

        // --- Initialization ---

        // Attaches event listeners and initializes the UI when the page loads.
        window.onload = function() {
            // Initialize the UI to the Residential tab
            changeServiceTab('Residential'); 
            
            // Attach the custom validation function to the form's submit event
            document.getElementById('booking-form').addEventListener('submit', validateBookingForm);
            
            // Attach event listener for the quote calculation button
            document.getElementById('quote-button').addEventListener('click', handleQuoteRequest);
        };
