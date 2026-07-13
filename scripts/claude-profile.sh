#!/usr/bin/env bash
#
# claude-profile.sh — keep separate "buckets" for your Claude Code usage.
#
# Claude Code stores everything for a session (settings, credentials, chat
# history, todos, projects, MCP servers) under a single config directory. By
# pointing the CLAUDE_CONFIG_DIR environment variable at different directories,
# you get fully isolated profiles that never share state. This helper wires up
# a "work" bucket and a "personal" bucket (plus arbitrary named buckets).
#
# --- Quick start -------------------------------------------------------------
#
#   # Source it from your shell rc (~/.bashrc or ~/.zshrc):
#   source /path/to/claude-code/scripts/claude-profile.sh
#
#   # Then launch Claude Code in an isolated bucket:
#   claude-work            # -> uses ~/.claude-work
#   claude-personal        # -> uses ~/.claude-personal
#   claude-profile client-x  # -> uses ~/.claude-client-x (any name)
#
#   # Inspect / manage buckets:
#   claude-profile --list
#   claude-profile --which
#
# Each bucket is a directory under $CLAUDE_PROFILE_HOME (default: $HOME).
# Override the directory prefix by exporting CLAUDE_PROFILE_HOME before sourcing.
#
# You can also run this file directly to just print the config dir for a
# profile without launching Claude Code:
#
#   eval "$(scripts/claude-profile.sh --export work)"   # exports CLAUDE_CONFIG_DIR
#
# -----------------------------------------------------------------------------

# Directory that holds the per-profile config dirs. Buckets are named
# "<prefix>.claude-<profile>" so they sit alongside the default ~/.claude.
: "${CLAUDE_PROFILE_HOME:=$HOME}"

# Resolve the config directory for a given profile name.
_claude_profile_dir() {
  local profile="$1"
  printf '%s/.claude-%s' "$CLAUDE_PROFILE_HOME" "$profile"
}

# Core entry point: claude-profile <name> [claude args...]
claude-profile() {
  local profile="${1:-}"

  case "$profile" in
    ""|-h|--help)
      cat <<'USAGE'
Usage: claude-profile <name> [claude args...]
       claude-profile --list
       claude-profile --which
       claude-profile --export <name>

Launch Claude Code in an isolated config "bucket" so work and personal
sessions never share credentials, history, settings, or MCP servers.

  <name>            Bucket to use (e.g. work, personal, client-x). The bucket
                    lives at $CLAUDE_PROFILE_HOME/.claude-<name>.
  --list            Show every bucket that exists and its size.
  --which           Show which bucket the current shell is pointed at.
  --export <name>   Print an `export CLAUDE_CONFIG_DIR=...` line for use with
                    eval, without launching Claude Code.

Convenience wrappers: `claude-work` and `claude-personal`.
USAGE
      return 0
      ;;
    --list)
      printf 'Claude Code buckets under %s:\n' "$CLAUDE_PROFILE_HOME"
      local found=0 dir name
      for dir in "$CLAUDE_PROFILE_HOME"/.claude-*/; do
        [ -d "$dir" ] || continue
        found=1
        name="${dir##*/.claude-}"
        name="${name%/}"
        printf '  %-16s %s\n' "$name" "${dir%/}"
      done
      # The default (unbucketed) config dir, if present.
      if [ -d "$CLAUDE_PROFILE_HOME/.claude" ]; then
        printf '  %-16s %s\n' "(default)" "$CLAUDE_PROFILE_HOME/.claude"
      fi
      [ "$found" -eq 0 ] && printf '  (none yet — run `claude-work` or `claude-personal` to create one)\n'
      return 0
      ;;
    --which)
      if [ -n "${CLAUDE_CONFIG_DIR:-}" ]; then
        printf 'CLAUDE_CONFIG_DIR=%s\n' "$CLAUDE_CONFIG_DIR"
      else
        printf 'CLAUDE_CONFIG_DIR is unset — using Claude Code default (~/.claude).\n'
      fi
      return 0
      ;;
    --export)
      local target="${2:-}"
      if [ -z "$target" ]; then
        printf 'claude-profile: --export needs a profile name\n' >&2
        return 2
      fi
      printf 'export CLAUDE_CONFIG_DIR=%s\n' "$(_claude_profile_dir "$target")"
      return 0
      ;;
  esac

  # Launch Claude Code in the chosen bucket. Scoped to this invocation only —
  # the parent shell's environment is left untouched.
  shift
  local config_dir
  config_dir="$(_claude_profile_dir "$profile")"
  mkdir -p "$config_dir"

  if ! command -v claude >/dev/null 2>&1; then
    printf 'claude-profile: `claude` CLI not found on PATH.\n' >&2
    printf '  Config dir is ready at: %s\n' "$config_dir" >&2
    return 127
  fi

  CLAUDE_CONFIG_DIR="$config_dir" claude "$@"
}

# Convenience wrappers for the two default buckets.
claude-work() { claude-profile work "$@"; }
claude-personal() { claude-profile personal "$@"; }

# Allow direct execution: `scripts/claude-profile.sh --list`, etc.
# When sourced, ${BASH_SOURCE[0]} != $0 and this block is skipped.
if [ "${BASH_SOURCE[0]:-$0}" = "$0" ]; then
  claude-profile "$@"
fi
