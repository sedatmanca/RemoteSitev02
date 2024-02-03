## Çalıştırma
```bash
npm i
npm run dev
```
komutları ile yerel ortamda çalıştırılabilir. master branchine yazılanlar CI/CD ile vercel'e deploy ediliyor.

## Kurallar (rastgele sıralama)
1. Her kural tartışmaya açık ve tekrar değerlendirilebilir :)
2. useEffect hiçbir şekilde kullanılmamalı
3. Next.js'in yapısından ötürü bazı kütüphanelerdeki (örn: leaflet) componentler direkt import edilemiyor, client tarafında import edilmesi gerekiyor. Bunun için Next.js'in dynamic import'u kullanılabilir
4. "style" yerine her zaman "className" kullanılmalı
5. Mümkün oldukça "any" keyword'ü kullanılmamalı, tipler mümkünse belirtilmeli (harita tarafında şimdilik bir tane any var)
6. document, window gibi vanilla JS objeleri kullanılmamalı
7. Bütün sayfalar app/[lang] altında bulunmalı
8. Componentler app klasöründe değil components klasöründe bulunmalı
9. page.tsx sadece ana component'i import etmeli
10. Düz HTML componentleri yerine ant design componentleri kullanılmalı (örn: button, select box vs.)
11. Fonksiyon, değişken ve sabit isimleri her zaman camelCase olmalı
12. interface ve typelar /types klasörü altında olmalı
13. importlar '@' ile veya public klasöründen sabit asset import'u yapılacaksa '#' kullanılmalı
14. enum yerine düz const JavaScript objesi kullanılmalı ve ObjectValues type'ı kullanılarak değerleri export edilmeli

## TODO
1. Formlardaki inputlarda bulunan onChange fonksiyonları kaldırılmalı, form hook'u kullanılmalı (ÖNEMLİ)
2. Ant Design kaldırılmalı, stil verilmesi kolay bir UI kütüphanesi kullanılmalı
3. Docker image'ı oluşturulmalı
4. Profil sayfası
5. Eski uygulamadaki özellikler eklenmeli

Markers:
https://github.com/pointhi/leaflet-color-markers

Ülke bayrakları:
https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/