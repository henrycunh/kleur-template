import kleur from 'kleur'

export function useStyle (content: string) {
    const replaceWithEffects = (match, content, effectChain) => {
        if (!effectChain.length || !content) return match
        const effects = effectChain.split('.')
        return effects.reduce((acc, effect) => {
            const effectFn = kleur[effect]
            if (!effectFn) return content
            return effectFn(acc)
        }, content)
    }
    return content.replace(/\[([^\]]*?)\]\(([^\)]*?)\)/g, replaceWithEffects)
}

export function style (tokens: TemplateStringsArray, ...args: string[]) {
    const combined = tokens.reduce(
        (acc, curr, i) => `${acc}${curr}${args[i] || ''}`,
        ''
    )
    return useStyle(combined)
}
