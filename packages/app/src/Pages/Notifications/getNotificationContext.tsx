import { EventKind, Nip10, NostrLink, TaggedNostrEvent } from "@snort/system";

export function getNotificationContext(ev: TaggedNostrEvent) {
  switch (ev.kind) {
    case EventKind.ZapReceipt: {
      const aTag = ev.tags.find(a => a[0] === "a");
      if (aTag) {
        return NostrLink.fromTag(aTag);
      }
      const eTag = ev.tags.find(a => a[0] === "e");
      if (eTag) {
        return NostrLink.fromTag(eTag);
      }
      const pTag = ev.tags.find(a => a[0] === "p");
      if (pTag) {
        return NostrLink.fromTag(pTag);
      }
      break;
    }
    case EventKind.Repost:
    case EventKind.Reaction: {
      const thread = Nip10.parseThread(ev);
      const tag = thread?.replyTo ?? thread?.root ?? thread?.mentions[0];
      if (tag) {
        return tag;
      }
      break;
    }
    case EventKind.TextNote: {
      return NostrLink.fromEvent(ev);
    }
  }
}
