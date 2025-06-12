  
        (function(){
            emailjs.init({ publicKey: "Y5mPHcPkTqKUKpSJR" });
        })();

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                website: formData.get('website') === '1' ? 'Website' : '',
                branding: formData.get('branding') === '1' ? 'Branding' : '',
                ecommerce: formData.get('ecommerce') === '1' ? 'E-commerce' : '',
                seo: formData.get('seo') === '1' ? 'SEO' : '',
                message: formData.get('message') || 'None',
                services: [
                    formData.get('website') === '1' ? 'Website' : '',
                    formData.get('branding') === '1' ? 'Branding' : '',
                    formData.get('ecommerce') === '1' ? 'E-commerce' : '',
                    formData.get('seo') === '1' ? 'SEO' : ''
                ].filter(Boolean).join(', ')
            };
            console.log('Form data:', data);

            emailjs.send('service_v81v73q', 'template_8smyao8', {
                to_name: data.name,
                to_email: data.email,
                reply_to: 'rathore.umesh29@gmail.com'
            })
            .then((response) => {
                console.log('User email sent to:', data.email, response);
                return emailjs.send('service_v81v73q', 'template_abbzdra', {
                    name: data.name,
                    email: data.email,
                    services: data.services,
                    message: data.message,
                    reply_to: 'rathore.umesh29@gmail.com'
                });
            })
            .then((response) => {
                console.log('Admin email sent:', response);
                document.getElementById('form-message').innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Form submitted successfully! You will receive a confirmation email.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                form.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                document.getElementById('form-message').innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Error submitting form. Please try again. Error: ${error.text || 'Unknown error'}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
            });
        });
    