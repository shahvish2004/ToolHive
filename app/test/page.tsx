export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page - Basic Routing</h1>
      <p>If you can see this page, basic routing is working.</p>
      <div>
        <a href="/" style={{ marginRight: '10px' }}>Go Home</a>
        <a href="/shop" style={{ marginRight: '10px' }}>Go to Shop</a>
        <a href="/tools" style={{ marginRight: '10px' }}>Go to Tools</a>
      </div>
    </div>
  )
}
