import NProgress from 'nprogress';

NProgress.configure({
    minimum: 0.2
})

export const INprogress = {
    unset() {
        NProgress.done()
    },
    set() {
        NProgress.start()
    }
}