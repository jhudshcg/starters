# GitHub accounts and local repository setup

Recorded 7 October 2026 for next session. This is a setup plan; SSH keys, SSH configuration and the remote have not been changed by this documentation task.

## Purpose and current position

Use a separate SSH key and host alias for each GitHub account, so each repository's remote selects its account automatically. Git pushes from VS Code will then use that configuration without requiring a GitHub CLI account switch. CLI operations such as creating pull requests still use the CLI's own active account.

This repository currently uses `https://github.com/jhudshcg/starters.git`. A push failed because HTTPS credentials identified `joe312213`. Setting the repository-local `credential.https://github.com.username` to `jhudshcg` selected the intended username but still required valid credentials. The user subsequently reported successful browser authentication. At the start of this documentation task, `main` and the local `origin/main` reference both pointed to `eaa7c99`, with no saved changes. A later reported commit failure is awaiting its own error output; do not assume it has the same cause.

## Next-session steps

1. Inspect the existing SSH configuration and public-key fingerprints. Reuse suitable account-specific keys if present; do not overwrite keys or replace unrelated SSH configuration. Keep private keys outside the repository and OneDrive.
2. If needed, create two passphrase-protected Ed25519 keys with distinct filenames, such as `~/.ssh/id_ed25519_github_jhudshcg` and `~/.ssh/id_ed25519_github_joe312213`. Add each `.pub` file as an authentication key in the corresponding GitHub account's SSH settings. These are account keys, not repository deploy keys.
3. Merge the following aliases into `~/.ssh/config`, adjusting filenames to match the actual keys. Check existing wildcard entries for conflicting settings or additional identity files.

```sshconfig
Host github-jhudshcg
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_jhudshcg
    IdentitiesOnly yes
    AddKeysToAgent yes
    UseKeychain yes

Host github-joe312213
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_joe312213
    IdentitiesOnly yes
    AddKeysToAgent yes
    UseKeychain yes
```

4. Use Apple's `/usr/bin/ssh-add --apple-use-keychain KEY_PATH` for each key to store its passphrase in macOS Keychain. Follow the [GitHub key and agent instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). Keep private-key permissions restricted to their owner.
5. Run `ssh -T git@github-jhudshcg` and `ssh -T git@github-joe312213`. Verify any first-use host fingerprint against GitHub's published fingerprints. Each greeting must name the intended account. GitHub's successful authentication test exits with status 1 because it does not provide shell access; inspect the greeting rather than treating that status alone as failure. See [testing SSH authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection).
6. Record the current remote, then set this repository's remote to the account-specific alias:

```sh
git remote -v
git remote set-url origin git@github-jhudshcg:jhudshcg/starters.git
git ls-remote origin HEAD
git push --dry-run origin main
```

7. Check a real push when there is intended work to publish, then verify VS Code Sync. A dry run checks access and proposed updates but does not prove that every server-side check will accept a real push. The old repository-local HTTPS username setting is unused with SSH; remove that specific setting after successful verification if it is still present. Do not clear credentials used by other repositories.

The host-alias approach follows GitHub's [SSH alias example](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#using-multiple-repositories-on-one-server), adapted here for separate account keys.

## Moving out of OneDrive

Choose a local destination, for example `~/Developer/starters`, and close the old VS Code workspace before switching. First record the current branch, commit, remote and `git status --short`, and preserve any uncommitted or untracked work. A fresh clone includes pushed history, not local-only commits, edits, ignored files or repository-local configuration. If copying the checkout, include `.git` and ensure OneDrive files are fully downloaded first.

Open only the intended local copy. Compare its commit and status with the original before retiring the old checkout. Recheck `core.hooksPath`, dependency installation and preview commands using [local development](local-development.md). Keep the original copy until the new checkout and any local-only work are verified. Moving the directory does not transfer GitHub ownership.

## If ownership changes later

After the repository has actually been transferred or created under `joe312213`, update both the alias and owner path:

```sh
git remote set-url origin git@github-joe312213:joe312213/starters.git
```

Changing the remote does not itself transfer ownership. If `joe312213` is merely a collaborator on the existing repository, use `git@github-joe312213:jhudshcg/starters.git` instead. Commit author name/email are separate from authentication; set repository-local author details if needed without rewriting earlier history.

## Diagnosing commit versus push failures

In VS Code, files under Changes or Staged Changes are uncommitted. Files under Graph or Outgoing Changes describe commits; A/M labels there do not indicate unsaved work. Use Save All, `git status -sb` and the latest Git Output error to establish the current state.

A local commit does not need GitHub authentication. This repository has a pre-commit hook at `.githooks/pre-commit` that builds staged source and stages `live/`. A commit failure may therefore be a local build or dependency error; read its output before changing credentials or bypassing the hook. A failed `git push` is a separate publication failure. Preserve changes while diagnosing either case.
