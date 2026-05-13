import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { useNotesStore } from "../../store/notesStore";
import "./NotesPage.css";

const EMPTY_FORM = {
	title: "",
	text: "",
	tags: "",
};

const EMPTY_NOTES = [];

const parseTagsInput = (value) =>
	value
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

function NoteModal({ initialValue, onClose, onSubmit }) {
	const [formData, setFormData] = useState(() => ({
		title: initialValue?.title || "",
		text: initialValue?.text || "",
		tags: initialValue?.tags?.join(", ") || "",
	}));
	const [errorText, setErrorText] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorText("");

		try {
			onSubmit({
				title: formData.title,
				text: formData.text,
				tags: parseTagsInput(formData.tags),
			});
			onClose();
		} catch (error) {
			setErrorText(error.message || "Не удалось сохранить заметку");
		}
	};

	return (
		<div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
			<div
				className="note-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="note-modal-title"
				onMouseDown={(e) => e.stopPropagation()}
			>
				<header className="note-modal-header">
					<h2 id="note-modal-title">
						{initialValue ? "Редактировать заметку" : "Новая заметка"}
					</h2>
					<button className="icon-button" type="button" onClick={onClose}>
						x
					</button>
				</header>

				<form className="note-modal-form" onSubmit={handleSubmit}>
					<label className="field">
						<span>Заголовок</span>
						<input
							name="title"
							value={formData.title}
							onChange={handleChange}
							placeholder="Например: идеи для проекта"
						/>
					</label>

					<label className="field">
						<span>Текст</span>
						<textarea
							name="text"
							value={formData.text}
							onChange={handleChange}
							placeholder="Содержание заметки"
							rows={6}
						/>
					</label>

					<label className="field">
						<span>Теги</span>
						<input
							name="tags"
							value={formData.tags}
							onChange={handleChange}
							placeholder="работа, идеи, важно"
						/>
					</label>

					{errorText ? <p className="auth-error">{errorText}</p> : null}

					<div className="modal-actions">
						<Button type="button" className="btn-secondary" onClick={onClose}>
							Отмена
						</Button>
						<Button type="submit" className="btn-primary">
							Сохранить
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

function NotesPage() {
	const { currentUser } = useAuth();
	const notesByUser = useNotesStore((state) => state.notesByUser);
	const createNote = useNotesStore((state) => state.createNote);
	const updateNote = useNotesStore((state) => state.updateNote);
	const deleteNote = useNotesStore((state) => state.deleteNote);
	const [activeTag, setActiveTag] = useState("");
	const [modalState, setModalState] = useState({
		isOpen: false,
		note: null,
	});

	const userId = currentUser?.id;
	const notes = userId ? notesByUser[userId] || EMPTY_NOTES : EMPTY_NOTES;
	const tags = useMemo(
		() => [...new Set(notes.flatMap((note) => note.tags || []))],
		[notes],
	);
	const filteredNotes = activeTag
		? notes.filter((note) => note.tags?.includes(activeTag))
		: notes;

	const openCreateModal = () => {
		setModalState({ isOpen: true, note: null });
	};

	const openEditModal = (note) => {
		setModalState({ isOpen: true, note });
	};

	const closeModal = () => {
		setModalState({ isOpen: false, note: null });
	};

	const handleModalSubmit = (payload) => {
		if (modalState.note) {
			updateNote(userId, modalState.note.id, payload);
			return;
		}

		createNote(userId, payload || EMPTY_FORM);
	};

	return (
		<div className="notes-page">
			<section className="board-header">
				<div>
					<p className="board-kicker">Рабочая доска</p>
					<h1>Заметки</h1>
					<p className="board-subtitle">
						Создавай заметки, добавляй теги и быстро фильтруй список.
					</p>
				</div>
				<Button className="btn-primary" type="button" onClick={openCreateModal}>
					Создать заметку
				</Button>
			</section>

			<section className="tag-panel" aria-label="Фильтр по тегам">
				<button
					className={`tag-filter ${activeTag === "" ? "is-active" : ""}`}
					type="button"
					onClick={() => setActiveTag("")}
				>
					Все
				</button>
				{tags.map((tag) => (
					<button
						key={tag}
						className={`tag-filter ${activeTag === tag ? "is-active" : ""}`}
						type="button"
						onClick={() => setActiveTag(tag)}
					>
						#{tag}
					</button>
				))}
			</section>

			<section className="notes-board">
				{filteredNotes.length === 0 ? (
					<div className="empty-board">
						<h2>Заметок пока нет</h2>
						<p>Создай первую заметку через кнопку выше.</p>
					</div>
				) : (
					filteredNotes.map((note) => (
						<article key={note.id} className="note-card">
							<div className="note-card-content">
								<h2>{note.title || "Без заголовка"}</h2>
								<p>{note.text || "Без текста"}</p>
							</div>

							{note.tags?.length ? (
								<div className="note-tags">
									{note.tags.map((tag) => (
										<button
											key={tag}
											className="note-tag"
											type="button"
											onClick={() => setActiveTag(tag)}
										>
											#{tag}
										</button>
									))}
								</div>
							) : null}

							<div className="note-actions">
								<Button
									type="button"
									className="btn-secondary"
									onClick={() => openEditModal(note)}
								>
									Изменить
								</Button>
								<Button
									type="button"
									className="btn-secondary"
									onClick={() => deleteNote(userId, note.id)}
								>
									Удалить
								</Button>
							</div>
						</article>
					))
				)}
			</section>

			{modalState.isOpen ? (
				<NoteModal
					initialValue={modalState.note}
					onClose={closeModal}
					onSubmit={handleModalSubmit}
				/>
			) : null}
		</div>
	);
}

export default NotesPage;
