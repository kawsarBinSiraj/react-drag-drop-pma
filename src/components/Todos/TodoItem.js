import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export const TodoItem = ({ text, index, onEdit, onDelete }) => {
    return (
        <>
            <Draggable draggableId={text.title} index={index}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="task-list">
                            <h4 className="task-title">
                                <span style={{ color: '#f0f' }}> &#8226; &nbsp;</span>  {text.title}
                            </h4>
                            <p className="task-desc">
                                {text.description}
                            </p>
                            <div className="task-footer d-flex align-items-center justify-content-between">
                                <div className="assignTo-list">
                                    {
                                        text.assignTo?.map((at, index) => {
                                            return (
                                                <img key={index + 1} src={at.avatar_url} alt="img" className="img-fluid" />
                                            )
                                        })
                                    }
                                </div>
                                <div className="button-group">
                                    <button className="btn" type="button">
                                        <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.75 2.5C9.16421 2.5 9.5 2.16421 9.5 1.75C9.5 1.33579 9.16421 1 8.75 1C8.33579 1 8 1.33579 8 1.75C8 2.16421 8.33579 2.5 8.75 2.5Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.75 2.5C16.1642 2.5 16.5 2.16421 16.5 1.75C16.5 1.33579 16.1642 1 15.75 1C15.3358 1 15 1.33579 15 1.75C15 2.16421 15.3358 2.5 15.75 2.5Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M1.75 2.5C2.16421 2.5 2.5 2.16421 2.5 1.75C2.5 1.33579 2.16421 1 1.75 1C1.33579 1 1 1.33579 1 1.75C1 2.16421 1.33579 2.5 1.75 2.5Z" stroke="#808191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="task-action-dropdown">
                                            <span onClick={() => { onEdit(text) }} className="btn-action"> Edit</span>
                                            <span onClick={() => { onDelete(text.id) }} className="btn-action"> Delete </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    )
}


export default TodoItem