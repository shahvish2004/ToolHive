'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Camera, MapPin, Shield, ChevronLeft, CheckCircle, Upload, X } from 'lucide-react'

const categories = ['Power Tools', 'Hand Tools', 'Garden', 'Cleaning', 'Specialty', 'Access Equipment', 'Other']
const conditions = ['Like New', 'Good', 'Fair', 'Needs TLC']
const neighbourhoods = ['Huron Village', 'Beechwood', 'Lakeshore', 'Columbia Forest', 'Laurelwood', 'Waterloo Park', 'Other']

export default function ListToolPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [form, setForm] = useState({
    toolName: '', brand: '', model: '', year: '', category: '',
    condition: '', description: '', dailyRate: '', neighbourhood: '', available: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newPhotos = Array.from(files).slice(0, 5 - photos.length).map(f => URL.createObjectURL(f))
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5))
  }

  const removePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = () => {
    if (!form.toolName || !form.category || !form.dailyRate || !form.neighbourhood) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <DashboardLayout title="HiveMatch™" subtitle="Tool Listed Successfully">
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-deep-slate mb-2">Tool Listed! 🐝</h2>
          <p className="text-gray-500 mb-2">Your <strong>{form.toolName}</strong> is now live on HiveMatch™.</p>
          <p className="text-sm text-gray-400 mb-8">Neighbours in <strong>{form.neighbourhood}</strong> can now find and request your tool.</p>
          <div className="bg-construction-amber/10 border border-construction-amber/20 rounded-xl p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Shield className="text-construction-amber flex-shrink-0" size={18} />
              <p className="text-xs text-gray-600">Your exact address is never shared until a deposit is confirmed by the renter.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/hivematch/browse')}
              className="flex-1 py-3 bg-deep-slate text-white rounded-lg font-medium hover:opacity-90">
              Browse Other Tools
            </button>
            <button onClick={() => { setSubmitted(false); setForm({ toolName: '', brand: '', model: '', year: '', category: '', condition: '', description: '', dailyRate: '', neighbourhood: '', available: true }); setPhotos([]) }}
              className="flex-1 py-3 bg-construction-amber text-white rounded-lg font-medium hover:opacity-90">
              List Another Tool
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="List a Tool" subtitle="Share your idle tools with the Hive">
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => router.push('/hivematch')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-deep-slate transition-colors">
          <ChevronLeft size={16} /> Back to HiveMatch™
        </button>

        {/* Photo Upload */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-deep-slate mb-1">Tool Photos <span className="text-red-500">*</span></h3>
          <p className="text-xs text-gray-400 mb-4">Upload up to 5 photos. First photo is the cover image.</p>
          <div className="grid grid-cols-5 gap-2">
            {photos.map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src={src} alt={`photo-${idx}`} className="w-full h-full object-cover" />
                <button onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <X size={10} />
                </button>
                {idx === 0 && <span className="absolute bottom-1 left-1 bg-construction-amber text-white text-xs px-1 rounded">Cover</span>}
              </div>
            ))}
            {photos.length < 5 && (
              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-construction-amber transition-colors">
                <Upload size={20} className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Add Photo</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Tool Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-deep-slate">Tool Details</h3>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Tool Name <span className="text-red-500">*</span></label>
            <input name="toolName" value={form.toolName} onChange={handleChange}
              placeholder="e.g. DeWalt 20V Cordless Drill"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. DeWalt, Makita"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Model</label>
              <input name="model" value={form.model} onChange={handleChange} placeholder="e.g. DCD777C2"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Year</label>
              <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2022"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Category <span className="text-red-500">*</span></label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber">
                <option value="">Select...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Condition</label>
            <div className="flex gap-2 flex-wrap">
              {conditions.map(c => (
                <button key={c} onClick={() => setForm({ ...form, condition: c })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${form.condition === c ? 'bg-construction-amber text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Describe your tool — accessories included, any quirks, usage tips..." rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber resize-none" />
          </div>
        </div>

        {/* Pricing & Location */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-deep-slate">Pricing & Location</h3>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Daily Rate (ToolTokens) <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-construction-amber font-bold text-sm">🪙</span>
              <input name="dailyRate" value={form.dailyRate} onChange={handleChange}
                placeholder="e.g. 15" type="number" min="1"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber" />
            </div>
            <p className="text-xs text-gray-400 mt-1">You earn 🪙 ToolTokens redeemable at $0.75/TT</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Neighbourhood <span className="text-red-500">*</span></label>
            <select name="neighbourhood" value={form.neighbourhood} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-amber">
              <option value="">Select your neighbourhood...</option>
              {neighbourhoods.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
            <Shield size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-700"><strong>Privacy Protected:</strong> Only your neighbourhood is shown to renters. Your exact address is only revealed after a deposit is confirmed.</p>
          </div>
        </div>

        <button onClick={handleSubmit}
          className="w-full py-4 bg-construction-amber text-white rounded-xl font-bold text-base hover:opacity-90 transition-opacity shadow-lg">
          🐝 List My Tool on HiveMatch™
        </button>
        <p className="text-xs text-gray-400 text-center pb-6">By listing, you agree to ToolHive™ community guidelines. © 2026 ToolHive™</p>
      </div>
    </DashboardLayout>
  )
}