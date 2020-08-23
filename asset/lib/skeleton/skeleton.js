/**
 * Génère un bloc "fantôme" pour précharger du contenu
 *
 * @property {ShadowRoot} root
 */
export default class Skeleton extends HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({ mode: 'open' })
  }

  /**
   * Génère une dimension en ajoutant l'unité si nécessaire
   *
   * @param {string} size
   * @param {boolean} fallbackTo100
   * @return {string}
   */
  size (size, fallbackTo100) {
    if (size) {
      if (size.match(/^[0-9]+$/)) {
        size += 'px'
      }
      return size
    } else if (fallbackTo100) {
      return '100%'
    }
    return 'auto'
  }

  connectedCallback () {
    const space = '\\00a0'
    const placeholder = this.getAttribute('placeholder') || space
    const rounded = this.getAttribute('rounded')
    const width = this.size(this.getAttribute('width'), placeholder === space)
    const height = this.size(this.getAttribute('height'))
    const lines = parseInt(this.getAttribute('lines') || 0, 10)

    let spans = '<span></span>'
    if (lines > 1) {
      for (let i = 1; i < lines; i++) {
        spans += '<span></span>'
      }
    }

    this.root.innerHTML = /*html*/ `
    <style>
      :host {
        display: block;
      }
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      span {
        position: relative;
        width: ${width};
        height: ${height};
        display: block;
        border-radius: ${rounded !== null ? '50%' : '4px'};
        background-color: var(--skeleton, #0000001C);
        overflow: hidden;
        transform: ${
          placeholder !== space || lines > 0 ? 'scale(1, 0.6)' : 'none'
        };
      }
      ${
        lines
          ? `
      span:last-child {
        width: ${20 + Math.random() * 60 + '%'}
      }`
          : ''
      }
      span::before {
        content: '${placeholder}';
        opacity: 0;
      }
      span::after {
        content:'';
        position: absolute;
        top: 0;
        left: 0; 
        right: 0;
        bottom: 0;
        animation: waves 1.6s linear .5s infinite;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, var(--skeleton-wave, rgba(0,0,0,0.06)), transparent);
      }
      @keyframes waves {
        0% {
          transform: translateX(-100%);
        }
        60% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    </style>
    <div>${spans}</div>
    `
  }
}
