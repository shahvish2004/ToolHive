'use client'

export default function SimpleShopPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Shop Page</h1>
      <p>This is a simplified shop page to test if routing works.</p>
      <div>
        <a href="/" style={{ marginRight: '10px' }}>Go Home</a>
        <a href="/tools" style={{ marginRight: '10px' }}>Go to Tools</a>
        <a href="/merch" style={{ marginRight: '10px' }}>Go to Merch</a>
      </div>
    </div>
  )
}
