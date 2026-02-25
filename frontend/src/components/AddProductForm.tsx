import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PhotoIcon, TagIcon, CurrencyDollarIcon, RocketLaunchIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function AddProductForm() {
    const { addProduct } = useShop();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        image: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        price: '',
        category: '',
        image: ''
    });

    const validate = () => {
        const newErrors = { title: '', price: '', category: '', image: '' };
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
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
                image: formData.image
            });
            setSuccess(true);
            setFormData({ title: '', price: '', category: '', image: '' });
            // Hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <section id="add-product" className="relative py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>

            <div className="layout-container relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
                            List Your Product
                        </h2>
                        <p className="text-gray-400">
                            Join our marketplace and reach thousands of customers. Fill in the details below to launch your product instantly.
                        </p>
                    </div>

                    <div className="bg-white/2 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Product Title</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400">
                                            <TagIcon className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Minimalist Desk Lamp"
                                            className={`w-full bg-white/5 border ${errors.title ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all`}
                                        />
                                    </div>
                                    {errors.title && <p className="text-xs text-red-400 ml-1">{errors.title}</p>}
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Price (INR)</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-emerald-400">
                                            <span className="text-lg font-bold">₹</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="e.g. 1500"
                                            className={`w-full bg-white/5 border ${errors.price ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all`}
                                        />
                                    </div>
                                    {errors.price && <p className="text-xs text-red-400 ml-1">{errors.price}</p>}
                                </div>


                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Category</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-400">
                                            <RocketLaunchIcon className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder="e.g. Electronics, Home"
                                            className={`w-full bg-white/5 border ${errors.category ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all`}
                                        />
                                    </div>
                                    {errors.category && <p className="text-xs text-red-400 ml-1">{errors.category}</p>}
                                </div>

                                {/* Image URL */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Image URL</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                                            <PhotoIcon className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://images.unsplash.com/..."
                                            className={`w-full bg-white/5 border ${errors.image ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500/30 transition-all`}
                                        />
                                    </div>
                                    {errors.image && <p className="text-xs text-red-400 ml-1">{errors.image}</p>}
                                </div>
                            </div>

                            {/* Status Messages */}
                            {success && (
                                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-emerald-400 animate-fade-in-up">
                                    <CheckCircleIcon className="h-5 w-5 shrink-0" />
                                    <p className="text-sm font-medium">Product listed successfully! Check the shop page.</p>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 animate-fade-in-up">
                                    <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full group relative flex items-center justify-center gap-3 py-5 rounded-2xl bg-white text-black font-black text-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading ? (
                                    <div className="h-6 w-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        List Now
                                        <RocketLaunchIcon className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
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
