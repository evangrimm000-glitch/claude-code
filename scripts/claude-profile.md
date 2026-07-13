# Separate work & personal Claude Code buckets

Claude Code keeps everything for your sessions — settings, credentials, chat
history, todos, project state, and MCP servers — under one config directory
(`~/.claude` by default). If you use the same machine for work and personal
projects, those get mixed into a single bucket.

`scripts/claude-profile.sh` fixes that by pointing the **`CLAUDE_CONFIG_DIR`**
environment variable at a different directory per profile. Each bucket is fully
isolated: separate logins, separate history, separate settings, separate MCP
servers. Nothing is shared between them.

## Setup

Source the script from your shell startup file (`~/.bashrc` or `~/.zshrc`):

```bash
source /path/to/claude-code/scripts/claude-profile.sh
```

## Usage

```bash
claude-work              # launch Claude Code in the "work" bucket    (~/.claude-work)
claude-personal          # launch Claude Code in the "personal" bucket (~/.claude-personal)
claude-profile client-x  # any named bucket you like                  (~/.claude-client-x)

claude-profile --list    # show every bucket and where it lives
claude-profile --which   # show which bucket the current shell points at
claude-profile --help    # full usage
```

Every wrapper forwards extra arguments straight through to `claude`, so
`claude-work --resume` or `claude-personal chat` work as expected. The config
override is scoped to that single launch — your shell's environment is left
untouched, so different terminal tabs can run different buckets at once.

## How it works

Under the hood each bucket is just a directory:

| Command             | Config directory (`CLAUDE_CONFIG_DIR`) |
| ------------------- | -------------------------------------- |
| `claude-work`       | `~/.claude-work`                       |
| `claude-personal`   | `~/.claude-personal`                   |
| `claude-profile foo`| `~/.claude-foo`                        |

The directory is created on first use. To move the buckets somewhere other than
`$HOME`, export `CLAUDE_PROFILE_HOME` before sourcing the script.

If you'd rather not source anything, you can set the variable inline for a
single run:

```bash
CLAUDE_CONFIG_DIR=~/.claude-work claude
```

or capture the export line for the current shell:

```bash
eval "$(scripts/claude-profile.sh --export work)"   # sets CLAUDE_CONFIG_DIR
```

## Migrating your existing sessions into a bucket

Your current, unbucketed config lives in `~/.claude`. To make it the "personal"
bucket (for example) while starting work fresh, copy it once:

```bash
cp -a ~/.claude ~/.claude-personal
```

Then use `claude-personal` going forward, and `claude-work` for a clean work
bucket. Leave `~/.claude` in place or remove it once you've confirmed the copy.
