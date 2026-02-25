import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  PhotoIcon,
  TagIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export function AddProductForm() {
  const { addProduct } = useShop();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  const validate = () => {
    const newErrors = { title: '', price: '', category: '', image: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = 'Valid price is required';
      isValid = false;
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
      isValid = false;
    } else if (!formData.image.startsWith('http')) {
      newErrors.image = 'Must be a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validate()) return;

    setLoading(true);
    try {
      await addProduct({
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        image: formData.image,
      });
      setSuccess(true);
      setFormData({ title: '', price: '', category: '', image: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="add-product" className="relative overflow-hidden py-24">
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="layout-container relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-3xl font-bold text-transparent">
              List Your Product
            </h2>
            <p className="text-gray-400">
              Join our marketplace and reach thousands of customers. Fill in the
              details below to launch your product instantly.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-gray-400">
                    Product Title
                  </label>
                  <div className="group relative">
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400">
                      <TagIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Minimalist Desk Lamp"
                      className={`w-full border bg-white/5 ${errors.title ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 focus:outline-none`}
                    />
                  </div>
                  {errors.title && (
                    <p className="ml-1 text-xs text-red-400">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-gray-400">
                    Price (INR)
                  </label>
                  <div className="group relative">
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-emerald-400">
                      <span className="text-lg font-bold">₹</span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 1500"
                      className={`w-full border bg-white/5 ${errors.price ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none`}
                    />
                  </div>
                  {errors.price && (
                    <p className="ml-1 text-xs text-red-400">{errors.price}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-gray-400">
                    Category
                  </label>
                  <div className="group relative">
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-400">
                      <RocketLaunchIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Electronics, Home"
                      className={`w-full border bg-white/5 ${errors.category ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none`}
                    />
                  </div>
                  {errors.category && (
                    <p className="ml-1 text-xs text-red-400">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-gray-400">
                    Image URL
                  </label>
                  <div className="group relative">
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                      <PhotoIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/..."
                      className={`w-full border bg-white/5 ${errors.image ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 focus:outline-none`}
                    />
                  </div>
                  {errors.image && (
                    <p className="ml-1 text-xs text-red-400">{errors.image}</p>
                  )}
                </div>
              </div>

              {success && (
                <div className="animate-fade-in-up flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                  <CheckCircleIcon className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">
                    Product listed successfully! Check the shop page.
                  </p>
                </div>
              )}

              {error && (
                <div className="animate-fade-in-up flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                  <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-5 text-lg font-black text-black transition-all hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {loading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black"></div>
                ) : (
                  <>
                    List Now
                    <RocketLaunchIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
