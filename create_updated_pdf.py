from weasyprint import HTML
import base64
import os

# Identify the logo file
# Try multiple possible logo file names
logo_files = ['image.png', 'transcend-logo.png', 'logo.png', 'input_file_0.png']
logo_src = ""

for logo_path in logo_files:
    try:
        with open(logo_path, "rb") as f:
            logo_base64 = base64.b64encode(f.read()).decode('utf-8')
            logo_src = f"data:image/png;base64,{logo_base64}"
            print(f"Logo loaded successfully: {logo_path}")
            break
    except FileNotFoundError:
        continue
    except Exception as e:
        print(f"Error loading logo {logo_path}: {e}")
        continue

if not logo_src:
    print("No logo file found. PDF will be generated without logo.")

# CSS with the specific brand colors: Blue #016B9D, Gold #FED33C, White #FFFFFF
styles = """
@page {
    size: A4;
    margin: 0;
}
body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333;
    line-height: 1.6;
    font-size: 11pt;
    margin: 0;
    background-color: #FFFFFF;
}
.header-bar {
    background-color: #016B9D;
    color: #FFFFFF;
    padding: 35px 20px;
    text-align: center;
    border-bottom: 6px solid #FED33C;
}
.logo-container {
    margin-bottom: 10px;
}
.logo-img {
    max-width: 200px;
    max-height: 80px;
}
.contact-info {
    font-size: 9.5pt;
    color: #FFFFFF;
    margin-top: 10px;
}
.main-content {
    padding: 40px 60px;
}
.date {
    color: #666;
    margin-bottom: 20px;
}
.recipient {
    margin-bottom: 30px;
}
.subject {
    color: #016B9D;
    font-weight: bold;
    font-size: 12pt;
    border-left: 5px solid #FED33C;
    padding-left: 15px;
    margin: 25px 0;
    text-transform: uppercase;
}
h2 {
    color: #016B9D;
    font-size: 14pt;
    border-bottom: 1px solid #FED33C;
    padding-bottom: 5px;
    margin-top: 30px;
}
ul {
    list-style-type: none;
    padding-left: 0;
}
ul li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
}
ul li::before {
    content: '';
    color: #FED33C;
    position: absolute;
    left: 0;
    font-size: 10pt;
}
.signature {
    margin-top: 50px;
}
.capability-page {
    page-break-before: always;
}
.cap-header {
    background-color: #016B9D;
    color: #FFFFFF;
    padding: 40px 20px;
    text-align: center;
    border-bottom: 6px solid #FED33C;
}
.cap-body {
    padding: 40px 60px;
}
.legal-name {
    font-size: 10pt;
    color: #FFFFFF;
    margin-top: 5px;
    font-style: italic;
}
.footer {
    text-align: center;
    font-size: 9pt;
    color: #888;
    margin-top: 60px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
"""

html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>{styles}</style>
</head>
<body>
    <div class="header-bar">
        <div class="logo-container">
            <img src="{logo_src}" class="logo-img" alt="Transcend Logo">
        </div>
        <div class="contact-info">
            Kitchener-Waterloo-Cambridge | Greater Toronto Area | Niagara Region<br>
            <strong>Phone:</strong> 382-889-0777 | <strong>Email:</strong> Transpromain@gmail.com
        </div>
    </div>

    <div class="main-content">
        <div class="date">April 16, 2026</div>
        
        <div class="recipient">
            <strong>Mr. Sanket Gandhi</strong><br>
            Director, Unit 35<br>
            461 Blackburn Community<br>
            Brantford, ON
        </div>

        <div class="subject">
            RE: YEAR-ROUND EXTERIOR PROPERTY MAINTENANCE & BEAUTIFICATION PROPOSAL
        </div>

        <p>Dear Mr. Gandhi,</p>

        <p>I am pleased to formally introduce <strong>Transcend Property Maintenance</strong> (legal entity: <em>Transcend Roadway Solutions Inc.</em>) as a comprehensive candidate for the seasonal care of the 461 Blackburn community.</p>

        <p>As a Project Manager and Engineer-in-Training (EIT), I apply technical oversight and precision to our property maintenance operations. Our firm focuses on proactive upkeep and aesthetic excellence, ensuring your community remains safe, inviting, and well-managed through every season.</p>

        <h2>Our Comprehensive Year-Round Services</h2>
        <ul>
            <li><strong>Winter Operations:</strong> Dedicated snow removal and proactive ice management for consistent safety.</li>
            <li><strong>Lawn & Turf Care:</strong> Precision lawn cutting, trimming, and scheduled health maintenance.</li>
            <li><strong>Gardening & Aesthetics:</strong> Professional weeding, garden maintenance, and mulch/remulch services.</li>
            <li><strong>Site Upkeep:</strong> Regular litter removal and general property debris clearing for peak curb appeal.</li>
        </ul>

        <h2>Consultation & Site Walkthrough</h2>
        <p>To provide a quote that is precisely tailored to the standards of 461 Blackburn, I would appreciate the opportunity to learn more about your specific scope of work and site requirements. We are eager to identify the areas that require the most attention to enhance the overall beauty of the property.</p>

        <p>I am available for a brief site walkthrough at your earliest convenience to discuss how we can best serve the community.</p>

        <div class="signature">
            Sincerely,<br><br><br>
            <strong>Vishesh Shah</strong><br>
            Principal Operations | Transcend Property Maintenance<br>
            382-889-0777
        </div>
    </div>

    <div class="capability-page">
        <div class="cap-header">
            <div class="logo-container">
                <img src="{logo_src}" class="logo-img" alt="Transcend Logo">
            </div>
            <h1 style="margin: 10px 0 0 0; letter-spacing: 2px;">CAPABILITY STATEMENT</h1>
            <div class="legal-name">Transcend Roadway Solutions Inc.</div>
        </div>

        <div class="cap-body">
            <h2>The Transcend Advantage</h2>
            <p>We bridge the gap between manual labor and professional asset management. By applying engineering principles to property care, we ensure high-quality delivery and schedule compliance.</p>

            <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #016B9D; border-radius: 4px;">
                <h3 style="color: #016B9D; margin-top: 0;">Key Strengths</h3>
                <ul>
                    <li><strong>Project Management Oversight:</strong> All tasks are managed through structured schedules and site audits.</li>
                    <li><strong>Specialized Equipment:</strong> Maintenance performed with our modern 2024 service fleet and high-performance machinery.</li>
                    <li><strong>Regional Reliability:</strong> Strategic operations across KWC, GTA, and the Niagara Region.</li>
                    <li><strong>Operational Transparency:</strong> GPS-verified service logs and digital site reports provided for Board records.</li>
                </ul>
            </div>

            <h2>Compliance & Safety</h2>
            <p>Transcend operates with full regulatory compliance and a safety-first mindset for high-traffic residential environments:</p>
            <ul>
                <li>Comprehensive $2M Commercial General Liability Insurance.</li>
                <li>Full WSIB coverage and compliance for all personnel.</li>
                <li>Rigorous site-safety protocols for community residents and visitors.</li>
            </ul>

            <div class="footer">
                <strong>Transcend Property Maintenance®</strong><br>
                <em>"Always there for you"</em>
            </div>
        </div>
    </div>
</body>
</html>
"""

# Generate PDF
output_filename = "Transcend_Proposal_461Blackburn_Updated.pdf"
HTML(string=html_template).write_pdf(output_filename)
print(f"PDF generated: {output_filename}")
