from weasyprint import HTML
import base64

# Load the logo image provided by the user
logo_path = 'input_file_0.png'
try:
    with open(logo_path, 'rb') as f:
        logo_base64 = base64.b64encode(f.read()).decode('utf-8')
except:
    logo_base64 = ''

# CSS Styles using specific brand color codes
# Blue: #016B9D, Gold: #FED33C, White: #FFFFFF
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
.page-container {
    padding: 20mm 15mm;
    min-height: 257mm;
    position: relative;
}
.header-bar {
    background-color: #016B9D;
    color: #FFFFFF;
    padding: 30px;
    text-align: center;
    border-bottom: 6px solid #FED33C;
}
.logo {
    width: 140px;
}
.brand-name {
    font-size: 20pt;
    font-weight: bold;
    margin-top: 10px;
    letter-spacing: 1px;
}
.contact-header {
    font-size: 9pt;
    margin-top: 10px;
    color: #FFFFFF;
}
.content {
    padding: 30px 15px;
}
.recipient-section {
    margin-bottom: 25px;
}
.date {
    color: #666;
    font-size: 10pt;
    margin-bottom: 5px;
}
.subject {
    font-weight: bold;
    color: #016B9D;
    font-size: 12pt;
    border-left: 4px solid #FED33C;
    padding-left: 10px;
    margin: 20px 0;
}
h2 {
    color: #016B9D;
    font-size: 14pt;
    margin-top: 25px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
}
.service-list {
    margin: 15px 0;
}
.service-item {
    margin-bottom: 8px;
    position: relative;
    padding-left: 20px;
}
.service-item::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: #FED33C;
    font-size: 9pt;
}
.signature {
    margin-top: 40px;
}
.capability-page {
    page-break-before: always;
    padding: 0;
}
.cap-title {
    background-color: #016B9D;
    color: #FFFFFF;
    padding: 40px;
    text-align: center;
    border-bottom: 6px solid #FED33C;
}
.cap-section {
    padding: 30px 45px;
}
.highlight-box {
    border: 1px solid #016B9D;
    background-color: #f9fbfc;
    padding: 20px;
    border-radius: 4px;
    margin: 20px 0;
}
.legal-footer {
    text-align: center;
    font-size: 9pt;
    color: #999;
    padding: 20px;
    border-top: 1px solid #eee;
    margin-top: 50px;
}
"""

html_content = f"""
<!DOCTYPE html>
<html>
<head><style>{styles}</style></head>
<body>
    <div class="page-container">
        <div class="header-bar">
            <img src="data:image/png;base64,{logo_base64}" class="logo">
            <div class="contact-header">
                KWC Area | Greater Toronto Area | Niagara Region<br>
                <strong>Phone:</strong> 382-889-0777 &nbsp; | &nbsp; <strong>Email:</strong> info@theborrowbarn.ca
            </div>
        </div>

        <div class="content">
            <div class="recipient-section">
                <div class="date">April 16, 2026</div>
                <strong>Mr. Sanket Gandhi</strong><br>
                Director, Unit 35<br>
                461 Blackburn Community<br>
                Brantford, ON
            </div>

            <div class="subject">
                RE: Year-Round Exterior Property Maintenance & Beautification Proposal
            </div>

            <p>Dear Mr. Gandhi,</p>

            <p>I am writing to formally introduce <strong>The Borrow Barn</strong> as a potential partner for the comprehensive, all-season care of the 461 Blackburn community.</p>

            <p>As a professional with a background in <strong>Project Management and Engineering (EIT)</strong>, I have structured The Borrow Barn to provide more than just standard manual labor. We offer a technical, oversight-driven approach to maintenance that prioritizes safety, resident satisfaction, and long-term property value.</p>

            <h2>Our Proposed Full-Service Scope</h2>
            <div class="service-list">
                <div class="service-item"><strong>Winter Safety:</strong> Proactive snow removal and ice management for roads and walkways.</div>
                <div class="service-item"><strong>Lawn & Turf Care:</strong> Precision cutting, trimming, and scheduled health cycles.</div>
                <div class="service-item"><strong>Horticultural Maintenance:</strong> Weeding, professional mulching, and garden bed beautification.</div>
                <div class="service-item"><strong>Site Integrity:</strong> Consistent litter removal and debris clearing for a clean, premium aesthetic.</div>
            </div>

            <h2>Consultation Request</h2>
            <p>To ensure we provide a quote that perfectly aligns with your community's standards, I would appreciate the opportunity to learn more about the <strong>specific scope of work and site-specific needs</strong> at 461 Blackburn. We are eager to identify which areas require prioritized attention to truly enhance the property's beauty.</p>

            <p>I am available for a brief site walkthrough next Tuesday or Wednesday. Please let me know if either of these times works for you.</p>

            <div class="signature">
                Sincerely,<br><br><br>
                <strong>Vishesh Shah</strong><br>
                Principal Operations | The Borrow Barn<br>
                382-889-0777
            </div>
        </div>
    </div>

    <div class="capability-page">
        <div class="cap-title">
            <h1 style="margin:0; letter-spacing: 2px;">CAPABILITY STATEMENT</h1>
            <div style="font-size: 11pt; margin-top: 10px; opacity: 0.9;">The Borrow Barn</div>
        </div>

        <div class="cap-section">
            <h2>The Borrow Barn Advantage</h2>
            <p>The Borrow Barn bridges the gap between traditional contracting and professional asset management. We bring engineering-level accountability to every property we service.</p>

            <div class="highlight-box">
                <ul style="margin:0; padding-left:20px; color: #016B9D;">
                    <li style="margin-bottom:10px;"><strong style="color:#333;">Project Management Oversight:</strong> All routes and tasks are managed through structured schedules and site audits.</li>
                    <li style="margin-bottom:10px;"><strong style="color:#333;">Specialized Professional Fleet:</strong> We utilize a modern 2024 service fleet equipped for high-reliability operations.</li>
                    <li style="margin-bottom:10px;"><strong style="color:#333;">Regional Reliability:</strong> Strategic operations covering KWC, GTA, and Niagara.</li>
                    <li><strong style="color:#333;">Operational Transparency:</strong> GPS-verified service logs and digital reporting provided for Board records.</li>
                </ul>
            </div>

            <h2>Compliance & Safety</h2>
            <p>We operate with a "Safety-First" mindset, ensuring 461 Blackburn is protected through full regulatory compliance:</p>
            <div class="service-list">
                <div class="service-item">Comprehensive $2M Commercial General Liability Insurance.</div>
                <div class="service-item">Full WSIB coverage for all on-site personnel.</div>
                <div class="service-item">Established safety protocols for high-traffic community environments.</div>
            </div>
        </div>

        <div class="legal-footer">
            <strong>The Borrow Barn®</strong><br>
            Legal Name: The Borrow Barn Inc.<br>
            <em>"Always there for you"</em>
        </div>
    </div>
</body>
</html>
"""

# Generate the PDF
HTML(string=html_content).write_pdf("TheBorrowBarn_Blackburn_Proposal.pdf")
print("PDF generated successfully: TheBorrowBarn_Blackburn_Proposal.pdf")
