//@ts-check
import React, { createContext, forwardRef, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from "react-i18next";
import './chat.scss';
import { createPortal } from 'react-dom';
import Label from '@/js/react/components/Label';
import { UserChannel } from '@js/modules/socket'
import { useFetch } from '@/js/react/hooks';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { Notifier } from '@/js/functions/notifier';
import Api from '@/js/api/api';

const AGENT_CONTEXT_DEFAULT_VALUE = {
    name: '',
    imageUrl: '',
    role: '',
    status: '',
    id: 1
}

// @ts-ignore
const URLS = window.chatUrls

const ChatAdminProfilContext = createContext(AGENT_CONTEXT_DEFAULT_VALUE)

const ChatDatasContext = createContext({
    datas: {
        chat_user_id: "",
        chat_option: "",
        chat_messages_datas: [
            {
                time: '',
                message: '',
                user_id: ''
            }
        ],
    },
    handleChatDatas: (data) => null,
})

const NotificationContext = createContext({
    setNotify: (v) => null
})


const CHAT_BOX = {
    home: 0,
    chat: 1
}


//Toggle chat and links
function toggleFab() {
    $('.prime').toggleClass('svg-icon');
    $('.prime').toggleClass('ni-fat-remove');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('.prime').toggleClass('mt-1-sm');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');
    $('#default-svg-icon').toggleClass('d-none')

}

function hideChatBox(hide) {
    switch (hide) {
        case 0:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'block');
            break;
        case 1:
            $('#chat_converse').css('display', 'block');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            break;
    }
}

const BtnLabel = ({ onClick = null, label }) => <button type="button" onClick={onClick} className="btn btn-outline-primary btn-sm my-2">{label}</button>


const IconCamera = () => <svg height="19" width="19" focusable="false" aria-hidden="true" viewBox="0 0 16 18"><path d="M14.154 6.918l-.004.003.001-.004-3.287 3.286-.006-.005-3.574 3.574c-.016.017-.03.036-.048.053l-.05.047-.043.041v-.002c-1.167 1.07-2.692 1.331-3.823.2-1.13-1.13-.89-2.677.18-3.843l-.005-.004.074-.073.016-.018c.006-.005.012-.009.017-.016l6.053-6.053.761.76-6.053 6.054-.029.028v.001l-.005.004-.073.074c.011-.01.025-.018.035-.03-.688.75-.93 1.636-.21 2.356.72.72 1.583.456 2.333-.232l-.03.034.04-.042.01-.008.008-.009.033-.03.031-.034.01-.009.007-.009 5.004-5.003.005.006 1.858-1.859c1.223-1.218 1.51-2.913.291-4.132C12.462.806 10.414.74 9.195 1.958L2.248 8.905c.003 0 .006-.002.008-.004-1.625 1.667-1.542 4.43.103 6.074 1.646 1.646 4.474 1.795 6.141.17-.003.002-.004.008-.008.012l.047-.047 6.053-6.054.042-.042.743.78-.025.021.001.002-6.05 6.05-.002.002-.002.001-.046.046h-.002c-2.094 2.04-5.578 1.894-7.652-.18-2.049-2.049-2.15-5.407-.183-7.505l-.006-.005h-.002l.076-.078 6.943-6.944.003-.002.004-.005c1.641-1.64 4.367-1.574 6.008.066 1.64 1.642 1.353 4.014-.288 5.655z" fillRule="evenodd"></path></svg>

const ChatHeader = ({ chatBox, setChatBox }) => {
    const agent = useContext(ChatAdminProfilContext)

    const goBack = (e) => {
        e.stopPropagation()
        setChatBox(CHAT_BOX.home)
    }

    return <div className="chat_header">
        <div className="chat_option">
            <div className="header_img">
                {!!agent.imageUrl.length && <img src={agent.imageUrl} />}
            </div>
            <span id="chat_head">{agent.name}</span>
            <br />
            <span className="agent">{agent.role}</span>
            <span className="online">({agent.status})</span>
            <span className="chat_close_ni">
                {chatBox !== CHAT_BOX.home &&
                    <i className="ni ni-bold-left clickable-a mr-3" onClick={goBack}></i>}
                <i id="chat_close_ni" className="ni ni-fat-remove"></i>
            </span>
        </div>
    </div>
}

/**
 * @param {{ onSend?:any, onFileUpload?:any, progressUpload?:any }} param0 
 */
const ChatField = ({ onSend, onFileUpload, progressUpload }) => {
    const { t } = useTranslation()
    const [value, setValue] = useState('')
    const { datas } = useContext(ChatDatasContext)

    const submit = () => {
        const trimed = value.trim()
        if (trimed.length) {
            onSend(trimed)
            setValue('')
        }
    }

    const onSelectFile = (e) => {
        if (!datas) {
            Notifier.error(t("Votre discussion de chat est vide, veuillez commencer par un texte"))
            return
        }
        /**
         * @type { File }
         */
        const file = e.target.files[0];
        if (file.size > 5003556) {
            Notifier.error(t("Votre fichier ne doit pas dépasser plus de 5MG"))
            return
        }
        onFileUpload(file)
    }

    return <div className="fab_field">
        <a id="fab_camera" className="fab ifile">
            <IconCamera />
            <input className="chat_ifile" type="file" onChange={onSelectFile} />
            {progressUpload !== null && (
                <div className="progress_ifile">
                    <span>{progressUpload}</span>
                </div>
            )}
        </a>
        <form className="d-inline" method="post" onSubmit={(e) => {
            e.preventDefault()
            submit()
        }}>
            <a id="fab_send" className="fab" onClick={submit}>
                <i className="ni ni-send"></i>
            </a>
            <input
                type="text"
                value={value}
                onChange={({ target: { value } }) => setValue(value)}
                placeholder={t('Envoyer un message')}
                className="chat_field chat_message" />
        </form>
    </div>
}

/**
 * @param {{ message?: any, children?:any, showImg?:boolean }} param0 
 */
const ChatMsgAdmin = ({ message, children, showImg = true }) => {
    const agent = useContext(ChatAdminProfilContext)
    return <>
        <span className="chat_msg_item chat_msg_item_admin">
            {showImg &&
                <div className="chat_avatar">
                    {!!agent.imageUrl.length && <img src={agent.imageUrl} />}
                </div>}
            <span>{message} {children}</span>
        </span>
    </>
}


const ChatMsgUser = ({ message, time }) => {
    return <>
        <span className="chat_msg_item chat_msg_item_user">
            {message.file && (
                <>
                    <img src="/img/svg/file.svg" width="30" height="30" /><br />
                    <span>{message.file.name}</span><br />
                </>
            )}
            <span>{message.message}</span>
        </span>
        {/* <span className="status">{time}</span> */}
        {/* <span className="status2" hidden>Just now. Not seen yet</span> */}
    </>
}

const ChatPriority = ({ chatOption }) => {
    const { t } = useTranslation()
    const { fetchAPi } = useFetch()
    const { handleChatDatas } = useContext(ChatDatasContext)

    const onClick = useCallback(() => {
        fetchAPi('post', URLS.chatPriority, { chat_option: chatOption }, true)
            .then(({ data }) => handleChatDatas(data))
    }, [chatOption])

    return <>
        <ChatMsgAdmin>
            {t('Hey, voulez-vous que cette discussion soit une priorité')}?<br />
            <BtnLabel label={t('Oui')} onClick={onClick} />
        </ChatMsgAdmin>
    </>
}

const ChatConverse = forwardRef( /** @param {*} param0  */({ chatOption }, ref) => {
    const { datas: cDatas } = useContext(ChatDatasContext)
    const { t } = useTranslation()
    // @ts-ignore
    const { id: authId, name } = useSelector(s => s.userAuth)
    let datas = null
    if (cDatas) {
        datas = { ...cDatas }
        if (chatOption !== datas.chat_option) {
            datas.chat_messages_datas = []
        }
    }

    let count = 0

    return <>
        <div id="chat_converse" ref={ref} className="chat_converse pt-3">
            {!datas && <ChatPriority chatOption={chatOption} />}
            <ChatMsgAdmin message={(
                <>
                    <span>{name + ', ' +
                        ((!datas || !datas.chat_messages_datas.length) ? t('Comment puis-je vous aider ?') : '')}
                    </span><br />
                    <span>{t('Une fois cette discussion terminée, elle sera supprimée dans deux heures')}.</span>
                </>
            )} />
            {!!datas && datas.chat_messages_datas.map((msg, i) => {
                if (msg.user_id == authId) {
                    count = 0
                    return <ChatMsgUser key={i} message={msg} time="" />
                } else {
                    const c = <ChatMsgAdmin key={i} message={msg.message} showImg={!count} />
                    count += 1
                    return c
                }
            })}
        </div>
    </>
})


const OPTIONS = {
    payment: 'payment',
    pricing: 'pricing',
    anything: 'anyother'
}

const Options = ({ chatOption, onClickChangeBox }) => {
    const { t } = useTranslation()
    const { datas } = useContext(ChatDatasContext)

    return <>
        <div className="chat_converse chat_login px-3">
            <div className="mt-2">
                {datas && (
                    <>
                        <div className="text-center">
                            <Label>
                                <div className="text-center">{t("Revenez à votre dernière discussion")}?</div>
                            </Label>
                            <button id="chat_first_screen" onClick={onClickChangeBox} className="btn-sm btn btn-primary rounded-circle">
                                <div className="btn-inner--icon">
                                    <i className="ni ni-bold-right"></i>
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Label>
                <div className="text-center">{t("Hey! Souhaitez-vous parler des Tarification, paiement, du support ou de n'importe quel autre")}?</div>
            </Label>
            <div className="d-flex justify-content-center mt-3 flex-wrap">
                <BtnLabel label={t('Paiement')} onClick={() => chatOption(OPTIONS.payment)} />
                <BtnLabel label={t('Tarification')} onClick={() => chatOption(OPTIONS.pricing)} />
                <div className="mx-2">
                    <BtnLabel label={t('Autre Chose')} onClick={() => chatOption(OPTIONS.anything)} />
                </div>
            </div>
        </div>
    </>
}



const ChatContent = () => {
    const { t } = useTranslation()
    const [agent, setAgent] = useState(AGENT_CONTEXT_DEFAULT_VALUE)
    const [chatBox, setChatBox] = useState(CHAT_BOX.home)
    const [chatOption, setChatOption] = useState(OPTIONS.anything)

    const [chatDatas, setChatDatas] = useState(null)

    const { fetchAPi } = useFetch()

    // @ts-ignore
    const { id: authId } = useSelector(s => s.userAuth)

    const bodyRef = useRef(null)

    const chatOptionRef = useRef(null)

    const [progressUpload, setProgressUpload] = useState(null)

    const pushMessage = (msg, _chatOption) => {
        setChatDatas(prev => {
            let dprev = (prev ? prev.chat_messages_datas : []);
            if (prev && prev.chat_option != _chatOption) {
                dprev = []
            }
            return {
                chat_user_id: authId,
                chat_option: _chatOption,
                chat_messages_datas: [...dprev, msg],
            }
        });
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight - 70
    }

    useEffect(() => {
        chatOptionRef.current = chatOption
    }, [chatOption])

    useEffect(() => {
        fetchAPi('get', URLS.chatIndex)
            .then(({ data: { expire, datas } }) => {
                if (!expire) {
                    setChatDatas(datas)
                    setChatOption(datas.chat_option)
                }
            })
    }, [])

    useEffect(() => {
        fetchAPi('get', URLS.chatAgent)
            .then(({ data }) => setAgent(data))
    }, [])

    const { setNotify } = useContext(NotificationContext)

    useEffect(() => {
        const prime = document.querySelector('#prime')
        UserChannel()
            .listen('.user.chat', (msg) => {
                if (!prime.classList.contains('is-visible')) {
                    setNotify(true)
                }
                pushMessage(msg, chatOptionRef.current)
            })
    }, [])

    useEffect(() => {
        hideChatBox(chatBox);
    }, [chatBox])


    const handleChatOption = useCallback((option) => {
        setChatOption(option)
        setChatBox(CHAT_BOX.chat);
    }, [setChatOption])


    const handleChatDatas = useCallback((datas) => {
        setChatDatas(datas)
    }, [])

    const chatDataMemo = useMemo(() => ({
        handleChatDatas,
        datas: chatDatas
    }), [handleChatDatas, chatDatas])

    const onClickChatBox = useCallback(() => {
        if (chatDatas && chatDatas.chat_option !== chatOption) {
            setChatOption(chatDatas.chat_option)
        }
        setChatBox(CHAT_BOX.chat)
    }, [chatDatas, chatOption])

    const onSend = useCallback((text) => {
        if (chatBox !== CHAT_BOX.chat) {
            setChatBox(CHAT_BOX.chat)
        }
        const time = { time: new Date().toLocaleDateString() }

        const _chatOption = chatOptionRef.current

        fetchAPi('post', URLS.chatStore, { chat_option: _chatOption, text, ...time }, true)

        pushMessage({ ...time, message: text, user_id: authId }, _chatOption)
    }, [authId, chatOptionRef.current, pushMessage, chatBox])

    const onFileUpload = useCallback(
        /**
         * @param { File } file
         */
        (file) => {
            if (chatBox !== CHAT_BOX.chat) {
                setChatBox(CHAT_BOX.chat)
            }

            const _chatOption = chatOptionRef.current

            const time = new Date().toLocaleDateString();

            const form = new FormData()

            form.append('file', file)
            form.append('time', time)
            form.append('user_id', authId)
            form.append('message', '')
            form.append('chat_option', _chatOption)

            Api.post(URLS.chatStore, form, {
                onUploadProgress(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgressUpload(percentCompleted)
                },
            }).finally(() => {
                window.setTimeout(() => {
                    setProgressUpload(null)
                }, 3000)
            })

            pushMessage({ time, message: null, user_id: authId, file: { name: file.name } }, _chatOption)
        }, [authId, chatOptionRef.current, chatBox, pushMessage, setProgressUpload])

    return <>
        <div className="chat">
            <ChatAdminProfilContext.Provider value={agent}>
                <ChatDatasContext.Provider value={chatDataMemo}>
                    <ChatHeader chatBox={chatBox} setChatBox={setChatBox} />
                    <Options onClickChangeBox={onClickChatBox} chatOption={handleChatOption} />
                    <ChatConverse chatOption={chatOption} ref={bodyRef} />
                    <ChatField onSend={onSend} progressUpload={progressUpload} onFileUpload={onFileUpload} />
                </ChatDatasContext.Provider>
            </ChatAdminProfilContext.Provider>
        </div>
    </>
}


export const Chat = () => {
    const [notify, setNotify] = useState(false)

    useEffect(() => {
        $('#prime, #chat_close_ni').on('click', () => toggleFab());
    }, [])

    const value = useMemo(() => ({ setNotify }), [setNotify])

    return createPortal((
        <div className="chatbox">
            <div className="fabs">
                <NotificationContext.Provider value={value}>
                    <ChatContent />
                    <a id="prime" className="fab" onClick={() => setNotify(false)}>
                        <i className="prime ni svg-icon">
                            <span id="default-svg-icon">
                                <svg style={{ height: "24px", width: "20px", marginTop: "6px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32">
                                    <path style={{ fill: "rgb(255, 255, 255)" }} d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"></path>
                                </svg>
                            </span>
                        </i>
                        {notify &&
                            <div className="notification-number">
                                <i className="ni ni-bell-55"></i>
                            </div>}
                    </a>
                </NotificationContext.Provider>
            </div>
        </div>
    ), document.body)
}