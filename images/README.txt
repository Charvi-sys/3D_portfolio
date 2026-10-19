Dress photos live in `src/data/images/` and are wired up as bundled imports in
`src/data/collections.js` (so they work both in dev and on GitHub Pages under
/3D_portfolio/).

Current mapping (see `src/data/collections.js`):

- dress.jpeg  -> Menswear (photo 1)
- dress4.jpeg -> Menswear (photo 2)
- dress1.jpeg -> Midnight (photo 1)
- dress3.jpeg -> Midnight (photo 2)
- dress5.jpeg -> Sunhari Chave (photo 1)
- dress6.jpeg -> Sunhari Chave (photo 2)

To swap a photo: replace the file in `src/data/images/` keeping the same name,
or add a new import at the top of `collections.js` and change the `photos` list
for that collection.

Accepted formats: .jpg / .jpeg / .png / .webp
(Portrait / 3:4 works best, e.g. 900x1200 or taller phone photos.)
