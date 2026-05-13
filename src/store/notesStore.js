import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

const normalizeTags = (tags) => {
	if (!Array.isArray(tags)) {
		return [];
	}

	const unique = new Set();
	tags.forEach((tag) => {
		const value = tag.trim().toLowerCase();
		if (value) {
			unique.add(value);
		}
	});

	return [...unique];
};

export const useNotesStore = create(
	persist(
		(set, get) => ({
			notesByUser: {},

			getNotes: (userId) => {
				if (!userId) {
					return [];
				}

				return get().notesByUser[userId] || [];
			},

			createNote: (userId, payload) => {
				if (!userId) {
					throw new Error("Требуется авторизация");
				}

				if (!payload.title.trim() && !payload.text.trim()) {
					throw new Error("Заполните заголовок или текст заметки");
				}

				const note = {
					id: nanoid(),
					title: payload.title.trim(),
					text: payload.text.trim(),
					tags: normalizeTags(payload.tags),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				};

				const current = get().notesByUser[userId] || [];
				set((state) => ({
					notesByUser: {
						...state.notesByUser,
						[userId]: [note, ...current],
					},
				}));

				return note;
			},

			updateNote: (userId, noteId, payload) => {
				if (!userId) {
					throw new Error("Требуется авторизация");
				}

				if (!payload.title.trim() && !payload.text.trim()) {
					throw new Error("Заполните заголовок или текст заметки");
				}

				const current = get().notesByUser[userId] || [];
				set((state) => ({
					notesByUser: {
						...state.notesByUser,
						[userId]: current.map((note) =>
							note.id === noteId
								? {
										...note,
										title: payload.title.trim(),
										text: payload.text.trim(),
										tags: normalizeTags(payload.tags),
										updatedAt: new Date().toISOString(),
									}
								: note,
						),
					},
				}));
			},

			deleteNote: (userId, noteId) => {
				if (!userId) {
					return;
				}

				const current = get().notesByUser[userId] || [];
				set((state) => ({
					notesByUser: {
						...state.notesByUser,
						[userId]: current.filter((note) => note.id !== noteId),
					},
				}));
			},
		}),
		{
			name: "notesAppBoard",
		},
	),
);
