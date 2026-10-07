# Code comments policy

Code comments should be concise and high signal only.

Code comments must avoid synomym rotation or any uncessary changing of terms. Call a spade a spade and be consistent in concept and code reference terms in comments (and in general).

As source files are updated, removed and added, comments should be kept up to date.

## Source file header comments

Should contain:

- File purpose (and any concepts needed to understand it). Generally 1 short paragraph. Max 2 paragraphs if needed (Purpose:)
- The key contents defined/implemented, as a list (Main contents:)
- Main sources that use this source (Used By:)
- Main sources that this source uses, not counting libraries (Uses:)
- Any use of libraries/packages and why used (Libs:)

Formatted as blank line separated blocks

This policy is applied to original source files, not any imported libs/packages and not html sources. css files should have a lighter touch header comment.

## Code body comments

Short function comments, as doc strings, containing function purpose, params details, what functions this calls, the main functions (if any) that call this function. Then, for non-trivial functions, 1-2 usage examples.

Where individual blocks or lines of code implement subtle or complex logic/behaviour, this should be commented with 1 line, or if justified 2 lines at most.
