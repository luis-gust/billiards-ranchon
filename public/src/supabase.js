// Archivo: public/src/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Copia estos valores desde Settings -> API en tu panel de Supabase
const supabaseUrl = 'https://jgqcqrcvtmaqpsajhcfz.supabase.co';
const supabaseKey = 'sb_publishable_v2yqGRS1MqI4p7Im3nf4tg_9NC5nwaE';
const supabase = createClient(supabaseUrl, supabaseKey);

export const db = {
    async getProductos() {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) throw error;
        return data;
    },

    onProductosChanged(callback) {
        return supabase
            .channel('cambios-productos')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, () => {
                this.getProductos().then(callback);
            })
            .subscribe();
    },

    async addProducto(producto) {
        const { error } = await supabase.from('productos').insert([producto]);
        if (error) throw error;
    },

    async updateProducto(id, datos) {
        const { error } = await supabase.from('productos').update(datos).eq('id', id);
        if (error) throw error;
    },

    async deleteProducto(id) {
        const { error } = await supabase.from('productos').delete().eq('id', id);
        if (error) throw error;
    },

    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    }
};