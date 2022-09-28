<template>
<div>  <div class="container">
        <button class="btn btn-info float-right" @click="itemNew">Yeni Ürün</button>

        <div class="modal fade" tabindex="-1" role="dialog" id="itemModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="itemSave">
                        <div class="modal-header">
                            <h5 class="modal-title">Ürün Kaydı</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="baslik">Başlık</label>
                                <input type="text" name="baslik" id="baslik" v-model="formItem.baslik" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="kategori">Kategori</label>
                                <input type="text" name="kategori" id="kategori" v-model="formItem.kategori" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="tutar">Tutar</label>
                                <input type="text" name="tutar" id="tutar" v-model="formItem.tutar" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" :value="formItem.id>0?'Güncelle':'Kaydet'">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <h2>Ürünler ({{list.length}})</h2>
        <table class="table table-bordered table-hover">
            <tr v-if="!list.length">
                <td>Kayıt yok</td>
            </tr>
            <tr v-for="item in list">
                <td>{{item.id}}</td>
           <!--      <td><img :src="item.resim" style="height: 120px;"></td> -->
                <td>{{item.baslik}}</td>
                <td>{{item.kategori}}</td>
                <td>{{item.tutar}}</td>
                <td>
                    <button class="btn btn-success btn-sm" @click="itemEdit(item.id)">Düzenle</button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" @click="itemDelete(item.id)">Sil</button>
                </td>
            </tr>
        </table>
    </div></div>
    </template>

    <script>



export default{
    data(){
return{
    formItem: {},
            list: []
}
    },

    
        created() {
            this.getProducts();
        },
        methods: {
          getProducts() {
                axios.get('http://localhost:3001/products')
                    .then((res) => {
                        this.list = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            itemNew() {
                this.formItem = {};
                $('#itemModal').modal('show');
            },
            itemSave() {
                if (this.formItem.id > 0) {
                    axios.put('http://localhost:3001/products/' + this.formItem.id, this.formItem)
                        .then((res) => {
                      
                            this.$swal('Ürün', 'Güncellendi', 'success');
                            this.getProducts();

                            this.formItem = {};
                            $('#itemModal').modal('hide');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    axios.post('http://localhost:3001/products', this.formItem)
                        .then((res) => {
                            this.$swal('Ürün', 'Kaydedildi', 'success');
                            this.getProducts();

                            this.formItem = {};
                            $('#itemModal').modal('hide');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            },
            itemEdit(id) {
                axios.get('http://localhost:3001/products/' + id)
                    .then((res) => {
                        this.formItem = res.data;

                        $('#itemModal').modal('show');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            itemDelete(id) {
                this.$swal({
                    title: 'Emin misiniz?',
                    text: 'Silmek istediğinize emin misiniz?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'İptal',
                    confirmButtonText: 'Sil'
                }).then((result)=> {
                    if (result.value) {
                        axios.delete('http://localhost:3001/products/' + id).
                            then((res) => {
                                this.$swal('Ürün', 'Silindi', 'success');
                                this.getProducts();
                            });
                    }
                })
            }
        }
  
}

        </script>

        <style>@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,700i&subset=latin-ext');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
            body {
              font-family: 'Segoe UI Light';
              font-size: 18px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
            }
            
            .form-control:focus {
              outline: none;
              box-shadow: none;
            }
            
            .navbar {
                margin-bottom: 20px;
            }</style>
