/**
 * كود البحث والفلترة - إعداد: عمر سامي
 * مهمتي: أخد اللي المستخدم بيكتبه، أفلتر المنتجات، وأخلي عمر طارق يعرضها
 */

// 1. بنعرف متغيرات عشان نشيل فيها "حالة" البحث والفلترة الحالية
// بنبدأ ببحث فاضي، وقسم "الكل"
let currentSearchTerm = ""; 
let currentCategory = "all";

// 2. بنمسك الـ Search Bar من الـ HTML باستخدام الـ ID اللي اتفقنا عليه
const searchInput = document.getElementById("search-bar");

// ---------------------------------------------------------

// 3. الدالة الأساسية للفلترة (بتاخد كل الشروط وتطبقها)
function applyFilters() {
    // إحنا بنفلتر من اللستة الأصلية اللي اسمها PRODUCTS (عشان الداتا متضيعش)
    // النتيجة بنحطها في window.filteredData عشان ملف products.js يشوفها
    window.filteredData = window.PRODUCTS.filter((product) => {
        
        // الشرط الأول: هل اسم المنتج (id) فيه الكلمة اللي ببحث عنها؟
        // بنحول الاتنين لـ Small عشان البحث ينجح لو الحروف كبيرة أو صغيرة
        const matchesSearch = product.id.toLowerCase().includes(currentSearchTerm.toLowerCase());

        // الشرط الثاني: هل المنتج تبع القسم المختار؟ 
        // لو القسم "all" يبقى كل المنتجات تمام، لو غير كدة بنقارن القسم باللي متسجل
        const matchesCategory = currentCategory === "all" || product.cat.toLowerCase() === currentCategory.toLowerCase();

        // المنتج لازم يحقق الشرطين مع بعض (البحث والقسم) عشان يظهر
        return matchesSearch && matchesCategory;
    });

    // بعد ما فلترنا الداتا، بنرجع الصفحة لرقم 1 عشان ميبقاش المستخدم في صفحة 5 والداتا بقت صفحة واحدة
    window.currentPage = 1;

    // بنادي على دالة الـ render اللي عمر طارق عملها عشان ترسم النتائج الجديدة
    window.render();
}

// ---------------------------------------------------------

// 4. مراقبة خانة البحث (أول ما المستخدم يكتب حرف)
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        // بنسجل الكلمة اللي اتكتبت في المتغير بتاعنا
        currentSearchTerm = event.target.value;
        
        // بنشغل الفلترة عشان نحدث النتائج فوراً (Live Search)
        applyFilters();
    });
}

// ---------------------------------------------------------

// 5. دالة تغيير القسم (Category)
// دي اللي بتشتغل لما حد يدوس على الأقسام في الـ HTML (Clothing, Electronics, etc.)
window.changeCategory = function(categoryName) {
  document.querySelectorAll("#category-list ul li").forEach(li => {
    li.classList.remove("active");
  });
  event.target.classList.add("active");

  currentCategory = categoryName;
  applyFilters();
};

// ---------------------------------------------------------

// 6. جزء الـ BOM (لو حد جاي من صفحة تانية ومعاه كلمة بحث في الرابط)
// بنستنى الصفحة تحمل بالكامل الأول
window.addEventListener("load", () => {
    // بنشوف لو الرابط فيه كلمة بحث، مثلاً: shop.html?search=Watch
    const urlParams = new URLSearchParams(window.location.search);
    const queryFromUrl = urlParams.get("search");

    if (queryFromUrl) {
        // لو لقينا كلمة، بنحطها في الخانة ونحدث المتغير ونعمل فلترة
        searchInput.value = queryFromUrl;
        currentSearchTerm = queryFromUrl;
        applyFilters();
    }
});