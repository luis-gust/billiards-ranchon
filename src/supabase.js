import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.1/+esm'

const supabaseUrl = 'https://jgqcqrcvtmaqpsajhcfz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncWNxcmN2dG1hcXBzYWpoY2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyODgxMjAsImV4cCI6MjA4NDg2NDEyMH0.GIUjeg7GykFrl7EyZZMGyEPcwrqE8a7Uv2HkvC92sMM';
const supabase = createClient(supabaseUrl, supabaseKey);

export const db = {
    // ESTA ES LA FUNCIÓN QUE FALTA
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) throw error;
        return data;
    },

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
    }
};