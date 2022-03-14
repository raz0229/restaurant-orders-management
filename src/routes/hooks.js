export const handle = async ({ event, resolve }) => {
    const response = await resolve(event, {
        ssr: event.url.pathname == '/deals' ? false : true
    });

    return response;
}